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
        let errorResponse;
        if (err.response) {
            const apiError = err.response.data;
            errorResponse = {
                code: apiError.code ?? null,
                message: apiError.message ?? "Bir hata oluştu",
                timestamp: apiError.timestamp ?? null,
                path: apiError.path ?? urlPath,
                validationErrors: apiError.validationErrors ?? {}
            };
        } else {
            errorResponse = {
                code: "NETWORK_ERROR",
                message: "Sunucuya erişilemedi.",
                timestamp: new Date().toISOString(),
                path: urlPath,
                validationErrors: {}
            };
        }
        setHasError(errorResponse);
        return { success: false, result: errorResponse };
    }
}

export default apiPostRequest;