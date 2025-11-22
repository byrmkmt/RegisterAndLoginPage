import "./assets/index.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from "react";
import { Snackbar, Alert } from '@mui/material';
import { useNavigate } from "react-router-dom";

import apiPostRequest from "./api/Api"

import { useError } from "./contexts/ErrorContext";

export default function Login(){
    const [loginForm, setLoginForm] = useState({username:null, password: null});
    const navigate = useNavigate();
    const {setHasError, hasError, clearErrors} = useError();  

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLoginForm(prev => ({
            ...prev,
            [name]: value
        }));
        if (hasError) clearErrors();
    };

    function ShowError() {
        if (!hasError || hasError.code === null) return null;

        const getErrorMessage = () => {
            if (hasError.message) return hasError.message;
            const errors = hasError.validationErrors;
            if (errors && Object.keys(errors).length > 0) {
                const firstKey = Object.keys(errors)[0];
                return errors[firstKey] || 'Bir hata oluştu';
            }
            return 'Bir hata oluştu';
        };

        return (
            <Snackbar
                open={true}
                autoHideDuration={6000}
                onClose={clearErrors}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="error" onClose={clearErrors}>
                    {getErrorMessage()}
                </Alert>
            </Snackbar>
        );
    }

    const submitLoginForm = async () => {
        const { success, result } = await apiPostRequest(loginForm, 
                                        "http://localhost:8083/home/login",
                                        {setHasError, hasError, clearErrors});
        if (success) {
            localStorage.setItem("username", loginForm.username);   
            navigate('/profile');
        }              
    };

    return (
        <>
            <div className='container' style= {{ height: "50vh" }}>
                <span></span>
                <TextField name="username" id="login-user-name" 
                    label="Kullanıcı Adı" variant="standard" 
                    error={!!hasError?.validationErrors?.username} helperText={hasError?.validationErrors?.username}
                    onChange={handleChange}/>
                <TextField name="password" id="login-user-password" 
                    label="Şifre" variant="standard" 
                    error={!!hasError?.validationErrors?.password} helperText={hasError?.validationErrors?.password}
                    onChange={handleChange}/>
                <Button variant="outlined"
                    onClick={submitLoginForm}>Oturum Aç</Button>
                <ShowError/>
            </div>
        </>
    );
}