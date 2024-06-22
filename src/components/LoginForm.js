import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import validator from 'validator';
import {useTranslation} from "react-i18next";

const LoginForm = ({ handleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { i18n } = useTranslation();

    const validateForm = () => {
        let valid = true;
        if (!validator.isEmail(email)) {
            setEmailError(i18n.t("PleaseEnterValidEmail"));
            valid = false;
        } else {
            setEmailError('');
        }
        if (password.length < 6) {
            setPasswordError(i18n.t("PassMustBe6+Long"));
            valid = false;
        } else {
            setPasswordError('');
        }
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            handleLogin({ email, password });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Paper elevation={3} className="w-full max-w-md p-8 rounded-md bg-gray-900 text-white">
                <Typography variant="h5" align="center" gutterBottom>
                    {i18n.t("Login")}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
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
                                className="mb-4"
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
                                className="mb-4"
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
                                {i18n.t("Login")}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    );
};

export default LoginForm;
