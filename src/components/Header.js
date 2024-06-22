import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, FormControl, Select, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (event) => {
        i18n.changeLanguage(event.target.value);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#212121' }}>
            <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" component={Link} to="/" sx={{ color: 'white', textDecoration: 'none' }}>
                        Otaku Tracker
                    </Typography>
                    <Button color="inherit" component={Link} to="/" sx={{ marginLeft: 2 }}>
                        {t('Home')}
                    </Button>
                    <Button color="inherit" component={Link} to="/gallery/1" sx={{ marginLeft: 2 }}>
                        {t('Gallery')}
                    </Button>
                    <Button color="inherit" component={Link} to="/list" sx={{ marginLeft: 2 }}>
                        {t('MyList')}
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button color="inherit" component={Link} to="/login" sx={{ marginLeft: 2 }}>
                        {t('Login')}
                    </Button>
                    <Button color="inherit" component={Link} to="/signup">
                        {t('Sign Up')}
                    </Button>
                    <FormControl sx={{ minWidth: 120 }}>
                        <Select
                            value={i18n.language}
                            onChange={changeLanguage}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Select language' }}
                            sx={{ color: 'white' }}
                        >
                            <MenuItem value="en">English 🇬🇧</MenuItem>
                            <MenuItem value="ro">Română 🇷🇴</MenuItem>
                            <MenuItem value="ru">Русский 🇷🇺</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
