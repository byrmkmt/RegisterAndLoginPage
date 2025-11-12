import { useError } from "../contexts/ErrorContext";
import apiPostRequest from "../api/Api"

import Button from '@mui/material/Button';
import PaymentIcon from '@mui/icons-material/Payment';
import { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle,TextField,Typography, Grid, CardHeader, CardContent, Card, CardActionArea, Alert
} from '@mui/material';

function TransferDialog(props){
    const {onOpen, onClose, profile} = props;
    const {hasError, setHasError, clearErrors} = useError(); 
    const username = localStorage.getItem("username") || ""; 
    const [targetAccount, setTargetAccount] = useState({
        fullName: '',
        accountNumber: '',
        message: '',
        quantity: 0
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setTargetAccount (prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleClose = () => {
        clearErrors();
        onClose();
    };    

    const submitMoneyTransfer = async () => {
        const { firstName, lastName } = splitFullName(targetAccount.fullName);
        const requestBody = {
            firstName: firstName,
            lastName: lastName,
            toAccountNumber: targetAccount.accountNumber,
            message: targetAccount.message,
            quantity: targetAccount.quantity,            
        };
        const {success, result} = await apiPostRequest(requestBody, 
                                        "http://localhost:8084/account/transfer/" + username,
                                        {setHasError, hasError, clearErrors});
        if (success) {
            console.log("Success: " +  result);
        } 
    }

    return (
        <Dialog onClose={handleClose}
                open={onOpen}
                PaperProps={{
                    sx: {
                    width: "600px",
                    maxWidth: "90vw"
                    },
                }} >                  
            <DialogTitle variant='h4' fontWeight={700} margin={2}>Para Transferi</DialogTitle>
            <DialogContent>

                {hasError && hasError.messages && Object.keys(hasError.messages).length > 0 &&  (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {typeof hasError.messages === "string"
                        ? hasError.messages
                        : Object.values(hasError.messages).join(", ")}
                    </Alert>
                )}

                <Card sx={{background:"#F4FAFF"}}>
                    <CardHeader title="Hesap Bilgileri" sx={{margin:"0rem 1rem", textAlign:'center'}}/>
                    <CardContent>
                        <Grid container columns={8} marginX={2} rowGap={2}>
                            <Grid size={4}>
                                <Typography variant="h6" fontWeight={400}>
                                        Hesap Numarası
                                </Typography>
                            </Grid>
                            <Grid size={4}>
                                <Typography variant="h6" fontWeight={400}>
                                        {profile.accountNumber}
                                </Typography>                          
                            </Grid>      
                            <Grid size={4}>
                                <Typography variant="h6" fontWeight={400}>
                                        Bakiye
                                </Typography>
                            </Grid>
                            <Grid size={4}>
                                <Typography variant="h6" fontWeight={400}>
                                        {profile.balance} TL
                                </Typography>                          
                            </Grid>                                   
                        </Grid>                          
                    </CardContent>
                </Card>               
            </DialogContent>
            <DialogActions sx={{display:'flex', flexDirection:'column', marginX:'1rem'}}>
                <Card sx={{background:"#F4FAFF"}}>
                    <CardHeader title="Alıcı Hesap Bilgileri" sx={{textAlign:'center'}}/>
                    <CardContent sx={{textAlign:'center'}}>
                        <TextField name="accountNumber" value={targetAccount.accountNumber}
                            label="Alıcı Hesap Numarası" variant="standard" onChange={handleChange}
                            />
                        <TextField name="fullName" value={targetAccount.fullName}
                            label="Alıcı Adı Soyadı" variant="standard" onChange={handleChange}
                            /> 
                        <TextField name="message" value={targetAccount.message}
                            label="Mesaj (İsteğe Bağlı)" variant="standard" onChange={handleChange}
                            />  
                        <TextField name="quantity" value={targetAccount.quantity}
                            label="Tutar" variant="standard" inputMode="numeric" pattern="[0-9]*"
                            onChange={handleChange}
                            />
                    </CardContent>
                </Card>             
            </DialogActions>
            <div style={{display:'flex', flexDirection:'row', gap:'10rem', margin:'2rem 0rem', justifyContent:'center'}}>
                <Button variant="outlined" onClick={onClose} color="#F4FAFF">
                    <span>Vazgeç</span>
                </Button>
                <Button variant="outlined" color="#F4FAFF" onClick={submitMoneyTransfer}>
                    <span>Gönder</span>
                </Button>                        
            </div>
        </Dialog>
    );
}

export default function AccountTransactionsPanel({profile}){
    const[showDialog, setShowDialog] = useState(false);

    const openDialog = () => {
        setShowDialog(true);
    };

    const closeDialog = () => {
        setShowDialog(false);
    }

    return (
        <>
            <Button variant="outlined"
                sx={{
                    color:"rgb(0, 58, 114)",
                    borderColor:'rgb(0, 58, 114)'
                }}
                startIcon={<PaymentIcon/>}
                onClick={openDialog}>
                    Para Transfer
            </Button>
            <TransferDialog
                onOpen={showDialog} 
                onClose={closeDialog}
                profile={profile}>
            </TransferDialog>      
        </>
    );
}



/* Helper method */
function splitFullName(fullName = "") {
    const parts = fullName.trim().split(/\s+/);

    if (parts.length === 0) {
        return { firstName: "", lastName: "" };
    }
    
    const lastName = parts.length > 1 ? parts.pop() : "";
    const firstName = parts.join(" ");
    
    return { firstName, lastName };
}    
