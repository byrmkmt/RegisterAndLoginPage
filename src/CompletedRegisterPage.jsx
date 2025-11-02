import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function CompletedRegisterPage(){
    const { state } = useLocation(); // navigate ile gelen veriler
    const { id, name, surname } = state || {}; // state undefined olursa hata vermez
    const sent = useRef(false);

    useEffect(() => {
        if (sent.current) 
            return;
        sent.current = true;

        axios.post(`http://localhost:8083/registration/registrar/complete/${id}`)
        .then(() => console.log("Completed!"))
        .catch(() => console.error("Not Completed!"));
    }, []);

    return (
        <>
            <div> Sayın {name} {surname}, Hesabınız başarılı bir şekilde oluşturulmuştur. </div>
            <div>Bizi tercih ettiğiniz için teşekkür ederiz.</div>
        </>
    );
}