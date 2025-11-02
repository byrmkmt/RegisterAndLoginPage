export default function ServerDown(){
    const serverDownStyle = {
        color : "white",
        fontWeight : "700",
        backgroundColor : "#00854c",
        padding: "1rem",
        borderRadius: "10px"
    }
    return (
        <div style={{display:"flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "50vh"}}>
            <div style={serverDownStyle}>Kayıt hizmetimiz teknik problemlerden dolayı kapalıdır, Özür Dileriz.</div>
        </div>
    );
}