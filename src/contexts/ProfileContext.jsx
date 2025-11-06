import {createContext, useContext, useState, useMemo} from "react";

const ProfileInfoContext = createContext();

export function ProfileInfoProvider({ children }) {
  const [profileInfo, setProfileInfo] = useState( {
        userId: null,
        accountNumber: null,
        firstName: null,
        lastName: null,
        balance: null,
        status: null,
        latestTransfers: []
    });

    const value = useMemo (() => ({ profileInfo, setProfileInfo}), [profileInfo]);
    return (
        <ProfileInfoContext.Provider value={value}>
        {children}
        </ProfileInfoContext.Provider>
    );
}

export function useProfileInfo(){
    return useContext(ProfileInfoContext);
}