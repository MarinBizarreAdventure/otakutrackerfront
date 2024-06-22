import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import validator from 'validator';
import {useTranslation} from "react-i18next";

const SignupForm = ({ handleSignup }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState('');
    const { i18n } = useTranslation();

    const validateForm = () => {
        let valid = true;

        // Validate email
        if (!validator.isEmail(email)) {
            setEmailError('Please enter a valid email');
            valid = false;
        } else {
            setEmailError('');
        }

        // Validate password
        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
            valid = false;
        } else {
            setPasswordError('');
        }

        // Validate repeat password
        if (password !== repeatPassword) {
            setRepeatPasswordError('Passwords do not match');
            valid = false;
        } else {
            setRepeatPasswordError('');
        }

        // Validate username
        if (username.trim() === '') {
            setUsernameError('Username is required');
            valid = false;
        } else {
            setUsernameError('');
        }

        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            handleSignup({ username, email, password });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Paper elevation={3} className="w-full max-w-md p-4 rounded-md bg-gray-900 text-white">
                <Typography variant="h5" align="center" gutterBottom>
                    {i18n.t("Sign Up")}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                error={!!usernameError}
                                helperText={usernameError}
                                required
                                InputProps={{
                                    className: 'text-white'
                                }}
                                InputLabelProps={{
                                    className: 'text-white'
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={!!emailError}
                                helperText={emailError}
                                required
                                InputProps={{
                                    className: 'text-white'
                                }}
                                InputLabelProps={{
                                    className: 'text-white'
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={!!passwordError}
                                helperText={passwordError}
                                required
                                InputProps={{
                                    className: 'text-white'
                                }}
                                InputLabelProps={{
                                    className: 'text-white'
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Repeat Password"
                                type="password"
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                error={!!repeatPasswordError}
                                helperText={repeatPasswordError}
                                required
                                InputProps={{
                                    className: 'text-white'
                                }}
                                InputLabelProps={{
                                    className: 'text-white'
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                {i18n.t("Sign Up")}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    );
};

export default SignupForm;
