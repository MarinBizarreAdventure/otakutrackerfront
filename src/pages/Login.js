import React from 'react';
import { Container, Grid } from '@mui/material';
import LoginForm from '../components/LoginForm';
import Header from "../components/Header";

const Login = () => {

    const handleLogin = (formData) => {
        setTimeout(() => {
            console.log('Logging in with:', formData);
        }, 500);
    };

    return (
        <div>
            <Header />
            <Container>
                <Grid container spacing={0} justify="center">
                    <Grid item xs={12}>
                        <div>
                            <LoginForm handleLogin={handleLogin} />
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Login;
