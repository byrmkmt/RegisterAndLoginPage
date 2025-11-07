import axios from "axios";

const apiPostRequest = async (requestBody, urlPath, errorHandlers, headers) => {
    const { setHasError, clearErrors, hasError } = errorHandlers;
    try{
        clearErrors();
        const finalHeaders = headers || { "Content-Type": "application/json" };
        const response = await axios.post(urlPath, requestBody,{
            headers: finalHeaders,
        });
        return { success: true, result: response };         
    } catch(err){
        if(err.response && err.response.status === 400){
            const data = err.response.data;
            if(data && typeof data === "object"){
                setHasError({
                    type: "validation",
                    messages: data
                })
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