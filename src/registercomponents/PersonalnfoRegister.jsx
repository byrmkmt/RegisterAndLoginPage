import "../assets/index.css";

import dayjs from 'dayjs';

import { useContext } from "react";
import apiPostRequest from "../api/Api"

import {AccountFormContext} from '../contexts/FormContext'
import { useError } from "../contexts/ErrorContext";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function PersonelInfoRegister({wizardStep}){
    const {accountForm, setAccountForm} = useContext(AccountFormContext);
    const {setHasError, hasError, clearErrors} = useError();

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
        const accountInfo ={
            customerId : accountForm.customerId,
            personalInformation: {
                firstName : accountForm.personalInformation.firstName,
                lastName: accountForm.personalInformation.lastName,
                tcNumber: accountForm.personalInformation.tcNumber,
                dateOfBirth: accountForm.personalInformation.dateOfBirth,                  
            }
        }
        const { success, result } = await apiPostRequest(accountInfo, 
                                        "http://localhost:8083/registration/registrar/personalInfo",
                                        {setHasError, hasError, clearErrors});
        if (success) {
            setAccountForm(prev => ({
                ...prev,
                customerId: result.data["customerId"]
            }));
            wizardStep(1);
        }                             
    }

    return (
        <>
            <div className='container' style= {{ height: "50vh" }}>
                <span style={{color:'#00854c', fontWeight:'700', fontSize: '1.25rem', paddingBottom: '1rem'}}>Kişisel Bilgiler</span>
                <TextField name = "firstName" id="registrer-user-name" 
                    label="İsim" variant="standard" 
                    value={accountForm.personalInformation.firstName}
                    error={!!hasError?.validationErrors?.firstName} helperText={hasError?.validationErrors?.firstName}
                    onChange={handleChange}/>
                <TextField name = "lastName" id="register-user-password" 
                    label="Soyisim" variant="standard" 
                    value={accountForm.personalInformation.lastName}
                    error={!!hasError?.validationErrors?.lastName} helperText={hasError?.validationErrors?.lastName}                    
                    onChange={handleChange}/>
                <TextField name = "tcNumber" id="register-user-tckn" 
                    label="T.C. Kimlik No" variant="standard" 
                    value={accountForm.personalInformation.tcNumber}
                    error={!!hasError?.validationErrors?.tcNumber} helperText={hasError?.validationErrors?.tcNumber}                          
                    onChange={handleChange}/>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker name="dateOfBirth" label="Doğum Tarihi" 
                        value={accountForm.personalInformation.dateOfBirth}
                        renderInput={(params) => 
                        <TextField 
                            {...params} 
                            error={!!hasError.validationErrors.dateOfBirth} 
                            helperText={hasError.validationErrors.dateOfBirth} 
                            />}                       
                        onChange={handleDatePicker}
                    />
                </DemoContainer>
                </LocalizationProvider>                    
                <Button variant="outlined" onClick={handleSubmitForm}>
                    <span>Sonraki</span>
                </Button>
            </div>
        </>
    );
}