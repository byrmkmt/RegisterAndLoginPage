import "./assets/index.css";

import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {AccountFormContext} from './contexts/FormContext'
import { useError } from "./contexts/errorContext";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function ContactInfoRegister({wizardStep}){
    const {accountForm, setAccountForm} = useContext(AccountFormContext);
    const {setHasError, hasError ,clearErrors} = useError();

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

    const handleTransition = async() => {
        const success = await handleSubmitForm();
        if (success) {
            wizardStep(2);
        } else {
            // showError
        }
    };    

    const handleSubmitForm = async () => {
        try{
            clearErrors();
            const contactInfo ={
                phoneNumber: accountForm.personalInformation.contactInformation.phoneNumber,
                email: accountForm.personalInformation.contactInformation.email,
                openAddress: accountForm.personalInformation.contactInformation.openAddress
            }            
            const id = accountForm.customerId;
            const response = await axios.post("http://localhost:8083/registration/registrar/contactInfo/" + id, contactInfo);
            setAccountForm(prev => ({
                ...prev,
                customerId: response.data["Customer Id"]
            }));
            localStorage.setItem("registerData", JSON.stringify({ 
                name:accountForm.personalInformation.firstName, 
                surname:accountForm.personalInformation.lastName }));        
            return true;                    
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
            else{
                setHasError({
                    type: "server",
                    messages:{general:"Server is disconnected."}
                });
            }   
            return false; 
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
                    <Button variant="outlined" onClick={handleTransition}>
                        <span>İleri</span>
                    </Button>
                </div>
            </div>
        </>
    );
}