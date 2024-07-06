import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#000000', // Black color
        },
        secondary: {
            main: '#000000', // Green color
        },
        tertiary: {
            main: '#009292', // Turquoise color
        },
    },
    typography: {
        fontFamily: 'Quicksand',
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700,
    },
});