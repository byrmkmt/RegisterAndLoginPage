import "./assets/index.css";

import {useState, useContext} from "react"

import {AccountFormContext} from './contexts/FormContext'

import axios from "axios";
import { useNavigate } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function AccountInfoRegister({wizardStep}){
    const {accountForm} = useContext(AccountFormContext);
    const [accountInfo, setAccountInfo] = useState({
            username: "",
            password: ""
    });
    const navigate = useNavigate();

    const buttonContainer = {display:'flex', 
        flexDirection: 'row', 
        width:'35%', 
        justifyContent: 'space-between',
        minWidth: '300px !important', width: '35%'
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setAccountInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitForm = async () => {
        const requestBody = {
            customerId:accountForm.customerId,
            username:accountInfo.username,
            password:accountInfo.password
        }
        const id = accountForm.customerId;
        axios.post(`http://localhost:8083/registration/registrar/complete/` + id,requestBody)
            .then(() => console.log("Completed!"))
            .catch(() => console.error("Not Completed!"));
        navigate("/success");                              
    }

    return (
        <>
            <div className='container' style= {{ height: "50vh" }}>
                <span style={{color:'#00854c', fontWeight:'700', fontSize: '1.25rem', paddingBottom: '1rem'}}>İletişim Bilgiler</span>
                <TextField name="username" value={accountInfo.username}                  
                    label="Kullanıcı Adı"  variant="standard" 
                    onChange={handleChange}/>
                <TextField name="password" value={accountInfo.password}
                    label="Şifre" variant="standard" type="password"
                    onChange={handleChange} />
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