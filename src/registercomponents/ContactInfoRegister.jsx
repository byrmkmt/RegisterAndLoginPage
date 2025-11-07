import "../assets/index.css";

import { useContext } from "react";
import {AccountFormContext} from '../contexts/FormContext'
import { useError } from "../contexts/ErrorContext";

import apiPostRequest from "../api/Api"

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function ContactInfoRegister({wizardStep}){
    const {accountForm, setAccountForm} = useContext(AccountFormContext);
    const {setHasError, hasError, clearErrors} = useError();

    const buttonContainer = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        minWidth: '300px',
        width: '35%'
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setAccountForm(prev => ({
            ...prev,
            personalInformation: {
            ...prev.personalInformation,
            contactInformation: {
                ...prev.personalInformation.contactInformation,
                [name]: value
            }
            }
        }));
    }

    const handleSubmitForm = async () => {
        const contactInfo ={
            phoneNumber: accountForm.personalInformation.contactInformation.phoneNumber,
            email: accountForm.personalInformation.contactInformation.email,
            openAddress: accountForm.personalInformation.contactInformation.openAddress
        }            
        const id = accountForm.customerId;
        const { success, result } = await apiPostRequest(contactInfo, 
                                        "http://localhost:8083/registration/registrar/contactInfo/" + id,
                                        {setHasError, hasError, clearErrors});
        if (success) {
            setAccountForm(prev => ({
                ...prev,
                customerId: result.data["Customer Id"]
            }));
            localStorage.setItem("registerData", JSON.stringify({ 
                name:accountForm.personalInformation.firstName, 
                surname:accountForm.personalInformation.lastName })); 
            wizardStep(2);
        }                        
    }

    return (
        <>
            <div className='container' style= {{ height: "50vh" }}>
                <span style={{color:'#00854c', fontWeight:'700', fontSize: '1.25rem', paddingBottom: '1rem'}}>İletişim Bilgiler</span>
                <TextField name="phoneNumber" id="registrer-user-phone-number" 
                    value={accountForm.personalInformation.contactInformation.phoneNumber}
                    error={!!hasError?.messages?.phoneNumber} helperText={hasError?.messages?.phoneNumber}                   
                    label="Cep Numarası"  variant="standard" 
                    onChange={handleChange}/>
                <TextField name="email" id="register-user-email" 
                    value={accountForm.personalInformation.contactInformation.email}
                    error={!!hasError?.messages?.email} helperText={hasError?.messages?.email}    
                    label="E-Posta" variant="standard" 
                    onChange={handleChange}/>
                <TextField name="openAddress" id="register-user-open-address" 
                    value={accountForm.personalInformation.contactInformation.openAddress}
                    error={!!hasError?.messages?.openAddress} helperText={hasError?.messages?.openAddress}    
                    label="Açık Adres" variant="standard" 
                    onChange={handleChange}/>
                <div style={buttonContainer}>
                    <Button variant="outlined" onClick={() => wizardStep(0)}>
                        <span>Geri</span>
                    </Button>
                    <Button variant="outlined" onClick={handleSubmitForm}>
                        <span>İleri</span>
                    </Button>
                </div>
            </div>
        </>
    );
}