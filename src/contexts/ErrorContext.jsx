import { createContext, useContext, useState, useMemo } from "react";

const ErrorContext = createContext();

export function ErrorProvider({children}){
    const initialErrorState = {
        code: null,
        message: null,
        timestamp: null,
        path: null,
        validationErrors: {}
    };

    const[hasError, setHasError] = useState(initialErrorState);

    const clearErrors = () => setHasError(initialErrorState)

    const value = useMemo (() => ({ hasError, setHasError , clearErrors}), [hasError]);
    return (
        <ErrorContext.Provider value={value}>
            {children}
        </ErrorContext.Provider>
    );
}

export function useError(){
    return useContext(ErrorContext);
}