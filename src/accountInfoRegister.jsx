import "./assets/index.css";

import {useState, useContext} from "react"

import {AccountFormContext} from './contexts/FormContext'
import { useError } from "./contexts/errorContext";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function AccountInfoRegister({wizardStep}){
    const {accountForm} = useContext(AccountFormContext);
    const [password, setPassword] = useState("");
     const {setHasError, hasError ,clearErrors} = useError();
    const navigate = useNavigate();

    const buttonContainer = {display:'flex', 
        flexDirection: 'row', 
        width:'35%', 
        justifyContent: 'space-between',
        minWidth: '300px !important', width: '35%'
    };

    const handleSubmitForm = async () => {
        clearErrors();
        const requestBody = {
            customerId: accountForm.customerId,
            password: password
        };
        const id = accountForm.customerId;
        try {
            await axios.post(`http://localhost:8083/registration/registrar/complete/${id}`, requestBody);
            console.log("Completed!");
            navigate("/success");
        } catch (err) {
            if (err.response && err.response.status === 400) {
                const data = err.response.data;
                if (data && typeof data === "object" && !data.message) {
                    setHasError({
                        type: "validation",
                        messages: data
                    });
                } else if (data.message) {
                    setHasError({
                        type: "validation",
                        messages: { general: data.message }
                    });
                } else {
                    setHasError({
                        type: "validation",
                        messages: { general: "Bilinmeyen doğrulama hatası" }
                    });
                }
            } else {
                setHasError({
                    type: "server",
                    messages: { general: "Server is disconnected." }
                });
            }
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