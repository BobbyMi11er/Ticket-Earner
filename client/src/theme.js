import palate from './styles/_vars.scss';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: palate.primary,
    },
    secondary: {
      main: '#f50057',
    },
  },
});