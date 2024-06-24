import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Header from '../components/Header';
import AnimeList from '../components/AnimeList';
import SearchBar from "../components/SearchBar";
import axios from 'axios';
import { useTranslation } from "react-i18next";

const Home = () => {
    const { i18n } = useTranslation();
    const [topAnimeIds, setTopAnimeIds] = useState([]);
    const [upcomingAnimeIds, setUpcomingAnimeIds] = useState([]);

    useEffect(() => {
        const fetchRankedAnimeIds = async () => {
            try {
                const rankedResponse = await axios.get('http://localhost:5107/api/Gallery/ranked?page=1&pageSize=15&sortOrder=ascending');
                const rankedIds = rankedResponse.data;

                const popularResponse = await axios.get('http://localhost:5107/api/Gallery/popular?page=1&pageSize=15&sortOrder=ascending');
                const popularIds = rankedResponse.data;


                setTopAnimeIds(popularIds);
                setUpcomingAnimeIds(rankedIds);
            } catch (error) {
                console.error('Error fetching anime IDs:', error);
            }
        };

        fetchRankedAnimeIds();
    }, []);

    return (
        <Box>
            <Header />
            <Box sx={{ height: 'calc(100vh - 64px)', overflowY: 'scroll', maxWidth: 'lg', margin: 'auto' }}>
                <SearchBar />
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <Box>
                        <AnimeList title={i18n.t("Top Animes")} animeIds={topAnimeIds} />
                        <AnimeList title={i18n.t("Upcoming Animes")} animeIds={upcomingAnimeIds} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
