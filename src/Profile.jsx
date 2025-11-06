
import ProfileHeader from './ProfileHeader'
import {useProfileInfo} from './contexts/ProfileContext'
import axios from "axios";
import { useEffect } from 'react';

export default function Profile (){
    const {profileInfo, setProfileInfo} = useProfileInfo();
    const username = localStorage.getItem("username") || "";

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(username);
                const res = await axios.post("http://localhost:8084/account/profile", username,
                    {headers: {"Content-Type": "text/plain"}});
                setProfileInfo({
                    userId: res.data.userId,
                    accountNumber: res.data.accountNumber,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    balance: res.data.balance,
                    status: res.data.status,
                    latestTransfers: res.data.latestTransfers
                });
            } catch (error) {
                console.error("Error fetching profile info:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <header>
                <ProfileHeader profile={profileInfo}></ProfileHeader>
            </header>
            <main></main>
            <footer></footer> 
        </>
    );
}