import React from 'react';
import { TextField, Box } from '@mui/material';

const SearchBar = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                maxWidth: '1000px',
                margin: 'auto',
            }}
        >
            <TextField
                id="outlined-search"
                label="Search Anime"
                type="search"
                variant="outlined"
                sx={{ width: '100%', margin: 2 }}
            />
        </Box>
    );
};

export default SearchBar;
