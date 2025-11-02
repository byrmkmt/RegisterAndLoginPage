import "./assets/index.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Login(){
    return (
        <>
            <div className='container' style= {{ height: "50vh" }}>
                <span></span>
                <TextField id="login-user-name" label="Kullanıcı Adı" variant="standard" />
                <TextField id="login-user-password" label="Şifre" variant="standard" />
                <Button variant="outlined">Oturum Aç</Button>
            </div>
        </>
    );
}