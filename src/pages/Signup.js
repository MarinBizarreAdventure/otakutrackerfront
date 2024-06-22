import React from 'react';
import { Container, Grid } from '@mui/material';
import SignupForm from '../components/SignupForm';
import Header from "../components/Header";

const Signup = () => {
    const handleSignup = (formData) => {
        setTimeout(() => {
            console.log('Signing up with:', formData);
        }, 500);
    };

    return (
        <div>
            <Header />
            <Container>
                <Grid container spacing={4} justify="center">
                    <Grid item xs={12}>
                        <div>
                            <SignupForm handleSignup={handleSignup} />
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Signup;
