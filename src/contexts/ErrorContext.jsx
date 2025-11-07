import { createContext, useContext, useState, useMemo } from "react";

const ErrorContext = createContext();

export function ErrorProvider({children}){
    const[hasError, setHasError] = useState({
        type: null,         // validation, server etc.
        messages: {}
    });

    const clearErrors = () => setHasError({
        type: null,
        messages: {}
    })

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