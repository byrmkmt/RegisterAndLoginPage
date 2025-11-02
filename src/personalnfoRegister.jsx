import "./assets/index.css";

import axios from "axios";
import dayjs from 'dayjs';

import { useContext } from "react";

import {AccountFormContext} from './FormContext'
import { useError } from "./errors/errorContext";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function PersonelInfoRegister({wizardStep}){
    const {accountForm, setAccountForm} = useContext(AccountFormContext);
    const {setHasError, hasError ,clearErrors} = useError();

    const handleClick = async() => {
        const success = await handleSubmitForm();
        if (success) {
            wizardStep(1);
        } else {
            // showError
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setAccountForm(prev => ({
            ...prev,
            personalInformation: {
                ...prev.personalInformation,
                [name]: value
            }
        }));
    };

    const handleDatePicker = (newValue) => { 
        setAccountForm(prev => ({
            ...prev,
            personalInformation: {
                ...prev.personalInformation,
                dateOfBirth: newValue ? dayjs(newValue) : null
            }
        }));        
    }    

    const handleSubmitForm = async () => {
        try{
            clearErrors();
            const accountInfo ={
                customerId : accountForm.customerId,
                personalInformation: {
                    firstName : accountForm.personalInformation.firstName,
                    lastName: accountForm.personalInformation.lastName,
                    tcNumber: accountForm.personalInformation.tcNumber,
                    dateOfBirth: accountForm.personalInformation.dateOfBirth,                  
                }
            }
            const res = await axios.post("http://localhost:8083/registration/registrar/personalInfo", accountInfo);
            setAccountForm(prev => ({
                ...prev,
                customerId: res.data["Customer Id"]
            }));
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
                <span style={{color:'#00854c', fontWeight:'700', fontSize: '1.25rem', paddingBottom: '1rem'}}>Kişisel Bilgiler</span>
                <TextField name = "firstName" id="registrer-user-name" 
                    label="İsim" variant="standard" 
                    value={accountForm.personalInformation.firstName}
                    error={!!hasError?.messages?.firstName} helperText={hasError?.messages?.firstName}
                    onChange={handleChange}/>
                <TextField name = "lastName" id="register-user-password" 
                    label="Soyisim" variant="standard" 
                    value={accountForm.personalInformation.lastName}
                    error={!!hasError?.messages?.lastName} helperText={hasError?.messages?.lastName}                    
                    onChange={handleChange}/>
                <TextField name = "tcNumber" id="register-user-tckn" 
                    label="T.C. Kimlik No" variant="standard" 
                    value={accountForm.personalInformation.tcNumber}
                    error={!!hasError?.messages?.tcNumber} helperText={hasError?.messages?.tcNumber}                          
                    onChange={handleChange}/>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker name="dateOfBirth" label="Doğum Tarihi" 
                        value={accountForm.personalInformation.dateOfBirth}
                        renderInput={(params) => 
                        <TextField 
                            {...params} 
                            error={!!hasError.messages.dateOfBirth} 
                            helperText={hasError.messages.dateOfBirth} 
                            />}                       
                        onChange={handleDatePicker}
                    />
                </DemoContainer>
                </LocalizationProvider>                    
                <Button variant="outlined" onClick={handleClick}>
                    <span>Sonraki</span>
                </Button>
            </div>
        </>
    );
}