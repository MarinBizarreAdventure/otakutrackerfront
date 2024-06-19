import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import AnimeList from '../components/AnimeList';

const topAnimes = [
    { image: 'https://cdn.myanimelist.net/images/anime/4/19644.jpg', title: 'Cowboy Bebop', rating: 4.5 },
    { image: 'https://cdn.myanimelist.net/images/anime/6/14331.jpg', title: 'Cowboy Bebop: The Movie', rating: 4 },
];

const upcomingAnimes = [
    { image: 'https://cdn.myanimelist.net/images/anime/7/20310.jpg', title: 'Trigun', rating: 3.5 },
    { image: 'https://cdn.myanimelist.net/images/anime/1796/91065.jpg', title: 'Robin', rating: 5 },
];

const Home = () => {
    return (
        <Box>
            <Header />
            <SearchBar />
            <AnimeList title="Top Animes" animes={topAnimes} />
            <AnimeList title="Upcoming Animes" animes={upcomingAnimes} />
        </Box>
    );
};

export default Home;
