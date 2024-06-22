import React from 'react';
import { Box, Typography } from '@mui/material';
import AnimeCard from './AnimeCard';

const VerticalAnimeList = ({ title, animes }) => {
    return (
        <Box sx={{ flexGrow: 1, margin: 2, minWidth: '200px'}}>
            <Typography variant="h4" gutterBottom>
                {title}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1
                }}
            >
                {animes.map((anime) => (
                    <Box
                        key={anime.animeId}
                        sx={{
                            flex: '1 1 calc(50% - 16px)',
                            maxWidth: 'calc(50% - 16px)'
                        }}
                    >
                        <AnimeCard
                            animeId={anime.animeId}
                            image={anime.image}
                            title={anime.title}
                            rating={anime.rating}
                            sx={{ width: '100%' }}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default VerticalAnimeList;
