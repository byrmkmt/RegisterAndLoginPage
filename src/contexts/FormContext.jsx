import { createContext, useState, useEffect } from "react";

export const AccountFormContext = createContext();

export function AccountProvider({ children }) {
  const [accountForm, setAccountForm] = useState( {
        customerId: null,
        personalInformation: {
            firstName : '',
            lastName: '',
            tcNumber: '',
            dateOfBirth: null,
            contactInformation : {
                phoneNumber:'',
                email:'',
                openAddress:''
            }
        }
    });

    useEffect(() => {
        localStorage.setItem("accountForm", JSON.stringify(accountForm));
    }, [accountForm]);

    return (
        <AccountFormContext.Provider value={{ accountForm ,setAccountForm}}>
        {children}
        </AccountFormContext.Provider>
    );
}