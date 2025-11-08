import { AppBar, Toolbar, Typography, Box, Chip, Paper, Grid } from '@mui/material';
import { ThemeProvider,StyledEngineProvider } from '@mui/material/styles';
import theme from '../assets/theme.js';
import "../assets/profile.css"

export default function ProfileInfoPanel({profile}) {
    return (
        <AppBar position="static"  sx={{ padding: 1, 
            background:"linear-gradient(to bottom right, rgb(15, 80, 125), rgba(255,255,255))",
            width: "60%  !important",
            margin: "auto"}}>
        <Toolbar>
            <Box sx={{ flexGrow: 1}}>
            <Paper sx={{boxShadow: "inset 0 4px 8px rgba(0, 60, 100, 0.2), 0 4px 8px rgba(255,255,255,0.1)", 
                    width: "60%  !important", 
                    padding: ".5rem"}}>
                <Typography variant="h6" margin={3} fontWeight={700}>
                    {profile.firstName} {profile.lastName}
                </Typography>
                <Grid container>
                    <Grid size={6}>
                        <Typography variant="body2" color="inherit" fontWeight={700} margin={3}>
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
                            sx={{ width: "6rem", fontWeight: "550", color:"#00854c", borderColor:"#00854c"}}
                        />                    
                    </Grid>
                    <Grid size={2}></Grid> 
                    <Grid size={6}>
                        <Typography variant="body2" color="inherit" fontWeight={700} margin={3}>Status</Typography>
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
                            sx={{ width: "6rem", fontWeight: "550", color:"#00854c", borderColor:"#00854c"}}
                        />
                    </Grid> 
                    <Grid size={2}></Grid>               
                </Grid>
            </Paper>     
            </Box>
        </Toolbar>
        </AppBar>
    );
}