
import ProfileInfoPanel from './profilecomponents/ProfileInfoPanel'
import ProfileBalancePanel from './profilecomponents/ProfileBalancePanel'
import LatestTransfersPanel from './profilecomponents/LatestTransfersPanel'
import AccountTransactionsPanel from './profilecomponents/AccountTransactionsPanel'

import { Paper } from '@mui/material';

import apiPostRequest from "./api/Api"
import { useError } from "./contexts/ErrorContext";

import {useProfileInfo} from './contexts/ProfileContext'
import { useEffect } from 'react';
import "./assets/profile.css"

export default function Profile (){
    const {profileInfo, setProfileInfo} = useProfileInfo();
    const {hasError, setHasError, clearErrors} = useError(); 
    const username = localStorage.getItem("username") || ""; 

    useEffect(() => {
        const fetchData = async () => {
            console.log(username);
            const {success, result} = await apiPostRequest(username, 
                                            "http://localhost:8084/account/profile",
                                            {setHasError, hasError, clearErrors},
                                            {"Content-Type": "text/plain"});
            if (success) {
                setProfileInfo({
                    userId: result.data.userId,
                    accountNumber: result.data.accountNumber,
                    firstName: result.data.firstName,
                    lastName: result.data.lastName,
                    balance: result.data.balance,
                    status: result.data.status,
                    latestTransfers: result.data.latestTransfers
                });
            } 
        };
        fetchData();
    }, []);

    return (
        <>
            <header>
                <ProfileInfoPanel profile={profileInfo}></ProfileInfoPanel>
            </header>
            <main style={{backgroundColor:"#ffffff"}}>
                <AccountTransactionsPanel profile={profileInfo}></AccountTransactionsPanel>
                <Paper sx={{display:'flex', flexDirection: 'row', gap:'1rem', justifyContent: 'center', padding:'2rem 0rem'}}>
                    <ProfileBalancePanel balance={profileInfo.balance}></ProfileBalancePanel> 
                    <LatestTransfersPanel latestTransfers={profileInfo.latestTransfers}></LatestTransfersPanel>
                </Paper>
            </main>
            <footer style={{backgroundColor:"#ffffff"}}>
            </footer> 
        </>
    );
}