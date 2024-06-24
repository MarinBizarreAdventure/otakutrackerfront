import React from 'react';
import './index.css';
import './i18n';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {createRoot} from "react-dom/client";
import {AuthProvider} from "./contexts/AuthContext";
import {AnimeListProvider} from "./contexts/AnimeContext";

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
    },
});

const root = createRoot(document.getElementById('root'));

root.render(
    <ThemeProvider theme={theme}>
        <AuthProvider>
            <App />
        </AuthProvider>
    </ThemeProvider>
);
