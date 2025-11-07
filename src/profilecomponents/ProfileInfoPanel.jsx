import { AppBar, Toolbar, Typography, Avatar, Box, Grid, Chip } from '@mui/material';
import "../assets/profile.css"

export default function ProfileInfoPanel({profile}) {
    return (
        <AppBar position="static" sx={{ padding: 1 }}>
        <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6">
                {profile.firstName} {profile.lastName}
            </Typography>
            <Typography variant="body2" color="inherit">
                Hesap No: {profile.accountNumber}
            </Typography>
            <Typography variant="body2" color="inherit">
                Status: {profile.status}
            </Typography>                             
            </Box>
        </Toolbar>
        </AppBar>
    );
}