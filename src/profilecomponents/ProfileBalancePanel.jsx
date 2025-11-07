import React from "react";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import "../assets/profile.css"


export default function ProfileBalancePanel({balance}){

    return (
        <React.Fragment>
            <div style={{display:"flex", justifyContent:"center"}}>
                <Box sx={{ bgcolor: '#f7ebebff', height: '60vh', width: "60%" ,marginTop: "1rem", borderRadius:"10px"}}>
                    <Card sx={{ minWidth: 275, width: "50%", height:"20vh", margin: "5rem 5rem 0"}}>
                    <CardContent>
                        <Typography sx={{ color: 'rgba(54, 133, 70)', fontSize: "1.25rem", padding:"1rem 2rem 0rem"}} component="div">
                            Bakiye
                        </Typography>
                        <Typography sx={{ color: 'rgba(54, 133, 70)', fontSize: "1.25rem", padding:"0.25rem 2rem 1rem" }} component="div">
                            {balance} TL
                        </Typography>                        
                        <Typography sx={{ color: 'rgba(54, 133, 70)', fontSize: "1.25rem", padding:"1rem 2rem 0rem"}} component="div">
                            Varlıklarım:  {balance} TL
                        </Typography>
                        <Typography sx={{ color: 'rgba(54, 133, 70)', fontSize: "1.25rem", padding:"0.25rem 2rem"}} component="div">
                            Borçlarım: 0 TL
                        </Typography>                            
                    </CardContent>
                    </Card>
                </Box>
            </div>
        </React.Fragment>
    );

}
