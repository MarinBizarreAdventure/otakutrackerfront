import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import LoginForm from '../components/LoginForm';
import Header from "../components/Header";
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const nav = useNavigate();

    const handleLogin = async (formData) => {
        try {
            const response = await axios.post('http://localhost:5107/auth/login', formData);

            const { token } = response.data;

            login(token);

            nav("/");

        } catch (error) {
            setError(error.message);
            console.error('Login error:', error);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 64px)' }}>
                <Box sx={{ maxWidth: 'sm', px: 2 }}>
                    <LoginForm handleLogin={handleLogin} />
                </Box>
            </Container>
        </Box>
    );
};

export default Login;
