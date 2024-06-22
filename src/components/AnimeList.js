import React from 'react';
import { Box, Typography } from '@mui/material';
import AnimeCard from './AnimeCard';
import './AnimeList.css';

const AnimeList = ({ title, animes }) => {
    return (
        <Box sx={{ margin: 4 }}>
            <Typography variant="h4" gutterBottom>
                {title}
            </Typography>
            <div className="anime-list-container">
                {animes.map((anime, index) => (
                    <AnimeCard key={index} animeId={anime.animeId} image={anime.image} title={anime.title} rating={anime.rating} />
                ))}
            </div>
        </Box>
    );
};

export default AnimeList;
