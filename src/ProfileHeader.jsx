import { AppBar, Toolbar, Typography, Avatar, Box, Grid, Chip } from '@mui/material';

export default function ProfileHeader({profile}) {
    return (
        <AppBar position="static" color="primary" sx={{ padding: 1 }}>
        <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6">
                {profile.firstName} {profile.lastName}
            </Typography>
            <Typography variant="body2" color="inherit">
                Hesap No: {profile.accountNumber}
            </Typography>
            <Typography variant="body2" color="inherit">
                Hesap No: {profile.balance} TL
            </Typography>  
            <Typography variant="body2" color="inherit">
                Status: {profile.status}
            </Typography>                             
            </Box>
        </Toolbar>
        </AppBar>
    );
}