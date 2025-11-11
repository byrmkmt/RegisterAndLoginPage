import React from "react";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material';


export default function ProfileBalancePanel({balance}){

    const theme = createTheme({
    typography: {
        fontFamily: 'Poppins, sans-serif',
        div: {
            fontSize: '1.2rem',
            fontWeight: 600,
            color: 'rgb(0, 58, 114)',
        }
    },
    });

    return (
        <React.Fragment>
            <div style={{display:"flex", justifyContent:"center"}}>
                <Box sx={{ 
                    height: '60vh', width: "80%" ,marginTop: "1rem"}}>
                    <ThemeProvider theme={theme}>
                        <Card sx={{ width: "30%", margin: "5rem 5rem 0", background:"#F4FAFF",
                            color:"#rgb(0, 58, 114)"
                        }}>
                        <CardContent>
                        <Grid container rowGap={1} margin={2} columns={8}>
                            <Grid size={4}>
                                <Typography variant="div">
                                    Bakiye
                                </Typography>                        
                            </Grid>  
                            <Grid size={4}>
                                <Typography textAlign={"center"} variant="div">
                                    {balance} TL
                                </Typography>                            
                            </Grid>
                            <Grid size={4}>
                                <Typography variant="div">
                                    Varlıklarım
                                </Typography>
                            </Grid>
                            <Grid size={4}>
                                <Typography textAlign={"center"} variant="div">
                                    {balance} TL
                                </Typography>
                            </Grid>
                            <Grid size={4}>
                                <Typography variant="div">
                                    Borçlarım
                                </Typography>   
                            </Grid>
                            <Grid size={4}>
                                <Typography textAlign={"center"} variant="div">
                                    0 TL
                                </Typography>                           
                            </Grid> 
                        </Grid>                                                                           
                        </CardContent>
                        </Card>
                    </ThemeProvider>
                </Box>
            </div>
        </React.Fragment>
    );

}
