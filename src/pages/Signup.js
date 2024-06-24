import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import SignupForm from '../components/SignupForm';
import Header from "../components/Header";
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const nav = useNavigate();

    const handleSignup = async (formData) => {
        try {
            const response = await axios.post('http://localhost:5107/auth/register', formData);

            const { token } = response.data;

            login(token);

            nav("/");

        } catch (error) {
            setError(error.message);
            console.error('Signup error:', error);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 64px)' }}>
                <Box sx={{ maxWidth: 'sm', textAlign: 'center', p: 2 }}>
                    <SignupForm handleSignup={handleSignup} />
                </Box>
            </Container>
        </Box>
    );
};

export default Signup;
