import "../assets/index.css";

import {useState, useContext} from "react"
import {AccountFormContext} from '../contexts/FormContext'
import { useNavigate } from "react-router-dom";
import { useError } from "../contexts/ErrorContext";

import apiPostRequest from "../api/Api"

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function AccountInfoRegister({wizardStep}){
    const {accountForm} = useContext(AccountFormContext);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {setHasError, hasError, clearErrors} = useError();

    const buttonContainer = {display:'flex', 
        flexDirection: 'row', 
        width:'35%', 
        justifyContent: 'space-between',
        minWidth: '300px !important', width: '35%'
    };

    const handleSubmitForm = async () => {
        const requestBody = {
            customerId: accountForm.customerId,
            password: password
        };
        const { success, result } = await apiPostRequest(requestBody, 
                                        "http://localhost:8083/registration/registrar/complete",
                                        {setHasError, hasError, clearErrors});
        if (success) {
            console.log("Completed!");
            navigate("/success");
        } 
    };

    return (
        <>
            <div className='container' style= {{ height: "50vh" }}>
                <span style={{color:'#00854c', fontWeight:'700', fontSize: '1.25rem', paddingBottom: '1rem'}}>İletişim Bilgiler</span>
                <TextField name="password" value={password}
                    label="Şifre" variant="standard" type="password"
                    error={!!hasError?.messages?.password} helperText={hasError?.messages?.password}  
                    onChange={(e) => setPassword(e.target.value)} />
                <div style={buttonContainer}>
                    <Button variant="outlined" onClick={() => wizardStep(1)}>
                        <span>Geri</span>
                    </Button>
                    <Button variant="outlined" onClick={handleSubmitForm}>
                        <span>Kayıt Talebi</span>
                    </Button>
                </div>
            </div>        
        </>
    );
}