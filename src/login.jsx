import "./assets/index.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from "react";
import { useError } from "./contexts/errorContext";
import { Snackbar, Alert } from '@mui/material';
import axios from "axios";

export default function Login(){
    const [loginForm, setLoginForm] = useState({username:null, password: null});
    const {setHasError, hasError, clearErrors}= useError();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLoginForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    function ShowError(){
        const getErrorMessage = () => {
            if (!hasError.messages) return '';
            
            if (hasError.messages.general) {
                return hasError.messages.general;
            }
            
            const firstMessage = Object.values(hasError.messages)[0];
            return firstMessage || 'Bir hata oluştu';
        };     

        return (<>
            <Snackbar
                open={hasError.type !== null}
                autoHideDuration={6000}
                onClose={() => clearErrors()}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert severity="error" onClose={() => clearErrors()}>
                    {getErrorMessage()}
                </Alert>
            </Snackbar>
            </>
        );
    }

    const submitLoginForm = async () => {
        try {
            clearErrors();
            await axios.post("http://localhost:8083/home/login", loginForm);
        } catch (err) {
            if (err.response) {
                const { status, data } = err.response;
                if (status === 400) {
                    if (data && typeof data === "object") {
                        if (data.message && typeof data.message === "string") {
                            setHasError({
                                type: "validation",
                                messages: { general: data.message }
                            });
                        } 
                        else if (Object.keys(data).length > 0) {
                            setHasError({
                                type: "validation",
                                messages: data
                            });
                        } else {
                            setHasError({
                                type: "validation",
                                messages: { general: "Bilinmeyen doğrulama hatası" }
                            });
                        }
                    } else {
                        setHasError({
                            type: "validation",
                            messages: { general: "Geçersiz istek" }
                        });
                    }
                } 
                else if (status === 401) {
                    setHasError({
                        type: "authentication",
                        messages: { general: data?.message || "Kullanıcı adı veya şifre hatalı" }
                    });
                }
                else if (status >= 500) {
                    // Sunucu hatası
                    setHasError({
                        type: "server",
                        messages: { general: "Sunucu hatası. Lütfen daha sonra tekrar deneyin." }
                    });
                }
                else {
                    setHasError({
                        type: "unknown",
                        messages: { general: data?.message || "Bir hata oluştu" }
                    });
                }
            } 
            else if (err.request) {
                setHasError({
                    type: "server",
                    messages: { general: "Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin." }
                });
            } 
            else {
                setHasError({
                    type: "unknown",
                    messages: { general: "Beklenmeyen bir hata oluştu" }
                });
            }
        }
    };


    return (
        <>
            <div className='container' style= {{ height: "50vh" }}>
                <span></span>
                <TextField name="username" id="login-user-name" 
                    label="Kullanıcı Adı" variant="standard" 
                    error={!!hasError?.messages?.username} helperText={hasError?.messages?.username}
                    onChange={handleChange}/>
                <TextField name="password" id="login-user-password" 
                    label="Şifre" variant="standard" 
                    error={!!hasError?.messages?.password} helperText={hasError?.messages?.password}
                    onChange={handleChange}/>
                <Button variant="outlined"
                    onClick={submitLoginForm}>Oturum Aç</Button>
                <ShowError/>
            </div>
        </>
    );
}