import axios from "axios";

const apiPostRequest = async (requestBody, urlPath, errorHandlers, headers) => {
    const { setHasError, clearErrors, hasError } = errorHandlers;
    try{
        clearErrors();
        const finalHeaders = headers || { "Content-Type": "application/json" };
        if(requestBody !== null) {
            const response = await axios.post(urlPath, requestBody,{
                headers: finalHeaders,
            });
            return { success: true, result: response };  
        } else{
            const response = await axios.get(urlPath,{
                headers: finalHeaders,
            });
            return { success: true, result: response };  
        }      
    } catch(err){
        if(err.response && err.response.status === 400){
            const data = err.response.data;
            if(data && typeof data === "object"){
                const entries = Object.entries(data);
                if (entries.length === 1) {
                    const [key, value] = entries[0];
                    const messages = Object.fromEntries(entries);
                    setHasError({
                        type: key,
                        messages: messages
                    });
                } else {
                    const messages = Object.fromEntries(entries);
                    setHasError({
                        type: "validation",
                        messages
                    });
                }
            } else if(data.message){
                setHasError({
                    type: "validation",
                    messages: {general: data.message}
                })
            } else{
                setHasError({
                    type: "validation",
                    messages: {general: "Bilinmeyen doğrulama hatası"}
                })
            }
        }
        else if(err.response && err.response.status === 401){
            const data = err.response.data;
            setHasError({
                type: "unauthorized",
                messages: typeof data === "object" ? data : { message: data }
            });
        }        
        else{
            setHasError({
                type: "server",
                messages:{general:"Server is disconnected."}
            });
        }   
        return { success: false, result: hasError};
    }
}

export default apiPostRequest;