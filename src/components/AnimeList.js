import React from 'react';
import { Box, Typography } from '@mui/material';
import AnimeCard from './AnimeCard';
import './AnimeList.css';

const AnimeList = ({ title, animeIds }) => {
    return (
        <Box sx={{ margin: 4 }}>
            <Typography variant="h4" gutterBottom>
                {title}
            </Typography>
            <div className="anime-list-container">
                {animeIds.map((animeId, index) => (
                    <AnimeCard key={index} animeId={animeId} />
                ))}
            </div>
        </Box>
    );
};

export default AnimeList;
