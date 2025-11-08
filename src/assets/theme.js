// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: "#00854c !important;" },
    secondary: { main: '#166d9fff' },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#ffffffff',
      secondary: '#00854c',
    },
  },
});

export default theme;
