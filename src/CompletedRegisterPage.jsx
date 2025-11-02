import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

export default function CompletedRegisterPage(){
    const savedData = JSON.parse(localStorage.getItem("registerData") || "{}");
    const { name, surname } = savedData;
    const sent = useRef(false);

    const navigate = useNavigate();

    const textContainer = {color:"#00854c", 
        fontWeight: "700",
        fontSize: "1rem",
        textAlign: "-webkit-center"
    }
    const parentContainer = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "50vw",
        height: "50vh",
        backgroundColor: "white",
        borderRadius: "10px",
        margin: "25vh auto"
    }

    useEffect(() => {
        if (sent.current) 
            return;
        sent.current = true;
    }, []);

  const backToHome = () => {
      localStorage.removeItem("registerData");
      navigate('/');
  };

    return (
        <div style={parentContainer}>
            <div style={textContainer}>
                <span>Sayın {name} {surname}, Hesap başvuruşu talebiniz alınmıştır. </span>
                <br></br>
                <span>Yakın zamanda tarafınıza bilgilendirme yapılacaktır.</span>
                <br></br>
                <span>Bizi tercih ettiğiniz için teşekkür ederiz.</span>
                <br></br>
                <Button variant="outlined" onClick={backToHome} style={{marginTop:"1rem"}}>
                    <span>Ana Sayfa</span>
                </Button>                
            </div>
        </div>
    );
}