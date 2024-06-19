import React from 'react';
import { Box, Typography } from '@mui/material';
import AnimeCard from './AnimeCard';

const AnimeList = ({ title, animes }) => {
    return (
        <Box sx={{ margin: 4 }}>
            <Typography variant="h4" gutterBottom>
                {title}
            </Typography>
            <Box sx={{ display: 'flex', overflowX: 'scroll' }}>
                {animes.map((anime, index) => (
                    <AnimeCard key={index} image={anime.image} title={anime.title} rating={anime.rating} />
                ))}
            </Box>
        </Box>
    );
};

export default AnimeList;
