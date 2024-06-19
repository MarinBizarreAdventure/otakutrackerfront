import React from 'react';
import { TextField, Box } from '@mui/material';

const SearchBar = () => {
    return (
        <Box sx={{ margin: 4, display: 'flex', justifyContent: 'center' }}>
            <TextField
                id="outlined-search"
                label="Search Anime"
                type="search"
                variant="outlined"
                sx={{ width: '50%' }}
            />
        </Box>
    );
};

export default SearchBar;
