import { AppBar, Toolbar, Typography, Box, Chip, Paper, Grid } from '@mui/material';
import "../assets/profile.css"

export default function ProfileInfoPanel({profile}) {
    return (
        <AppBar position="static"  sx={{ padding: 1,
                background:"linear-gradient(to bottom right, rgb(15, 80, 125), rgba(255,255,255))"
            }}>
            <Toolbar style={{margin:"auto"}}>
                <Box sx={{ flexGrow: 1}} marginY={1}>
                <Typography variant="h6" fontWeight={700}>
                    Hesap Bilgileri
                </Typography>           
                <Paper sx={{boxShadow: "inset 0 4px 8px rgba(0, 60, 100, 0.2), 0 4px 8px rgba(255,255,255,0.1)", 
                        padding: ".5rem"}}>
                    <Grid container rowGap={2} marginY={2} marginX={1}>
                        <Grid size={8}>
                        <Typography variant="h6" fontWeight={700}>
                            {profile.firstName} {profile.lastName}
                        </Typography>
                        </Grid>
                        <Grid size={4}>
                            <Typography textAlign={'center'} fontWeight={400}>
                            Maaş Hesabı
                            </Typography>
                        </Grid>
                        <Grid size={4}>
                            <Typography variant="body2" color="inherit" fontWeight={700}>
                                Hesap Numarası
                            </Typography>
                        </Grid>
                        <Grid size={4} sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center"}}>
                            <Chip
                                label={profile.accountNumber}
                                variant="outlined"
                                color="rgb(0, 50, 20)"
                                sx={{ width: "6rem", fontWeight: "550", color:"#rgb(0, 50, 20)"}}
                            />                    
                        </Grid>
                        <Grid size={4}></Grid> 
                        <Grid size={4}>
                            <Typography variant="body2" color="inherit" fontWeight={700}>Status</Typography>
                        </Grid>
                        <Grid size={4} sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center"}}>
                            <Chip
                                label={profile.status}
                                variant="outlined"
                                color="rgb(0, 50, 20)"
                                sx={{ width: "6rem", fontWeight: "550", color:"rgb(0, 50, 20)"}}
                            />
                        </Grid> 
                        <Grid size={4}></Grid>               
                    </Grid>
                </Paper>     
                </Box>
            </Toolbar>
        </AppBar>
    );
}