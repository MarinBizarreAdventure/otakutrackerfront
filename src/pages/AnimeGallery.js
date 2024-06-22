import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Pagination, Container, Grid, Button, Box } from '@mui/material';
import AnimeGalleryCard from '../components/AnimeGalleryCard';
import Header from '../components/Header';
import {useTranslation} from "react-i18next";

const genres = [
    "Adventure", "Sci-Fi", "Mystery", "Sports", "Mecha", "Music", "Military", "Cars",
    "Vampire", "Game", "Horror", "Josei", "Slice of Life", "Police", "Ecchi", "Magic",
    "Shoujo", "Space", "Comedy", "Shoujo Ai", "Fantasy", "Drama", "Samurai", "Harem",
    "Demons", "Romance", "Historical", "Thriller", "Martial Arts", "Dementia",
    "Supernatural", "School", "Action", "Shounen", "Psychological", "Super Power", "Seinen"
];

const AnimeGallery = () => {
    const { page } = useParams();
    const [animes, setAnimes] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();
    const itemsPerPage = 10;
    const { i18n } = useTranslation();

    useEffect(() => {
        const fetchAnimes = async () => {
            const dummyData = Array.from({ length: 100 }, (_, index) => ({
                id: index + 1,
                image: 'https://cdn.myanimelist.net/images/anime/10/24649.jpg',
                title: `Anime Title ${index + 1}`,
                rating: Math.floor(Math.random() * 5) + 1,
                description: `Description for anime ${index + 1}. This is a brief description of the anime.`,
                year: 2000 + (index % 20),
            }));

            setAnimes(dummyData);
            setTotalPages(Math.ceil(dummyData.length / itemsPerPage));
        };

        fetchAnimes();
    }, []);

    const handlePageChange = (event, value) => {
        navigate(`/gallery/${value}`);
    };

    const startIndex = (page - 1) * itemsPerPage;
    const selectedAnimes = animes.slice(startIndex, startIndex + itemsPerPage);

    return (
        <Box sx={{ overflowY: 'hidden' }}>
            <Header />
            <Grid container >
                <Grid item xs={3} sx={{ padding: 2, borderRight: '1px solid #ccc' }}>
                    <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
                        {i18n.t("Filter by Genre")}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {genres.map(genre => (
                            <Button
                                key={genre}
                                variant="outlined"
                                sx={{ marginBottom: 1, marginRight: 1 }}
                                onClick={() => console.log(`Filter by genre: ${genre}`)}
                            >
                                {genre}
                            </Button>
                        ))}
                    </Box>
                </Grid>
                <Grid item xs={9} sx={{ overflow: 'hidden' }}>
                    <Box sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 64px)' }}>
                        <Container maxWidth="sm" sx={{ marginTop: 5 }}>
                            <Typography variant="h4" component="div" sx={{ marginBottom: 3 }}>
                                {i18n.t("Anime Gallery")}
                            </Typography>
                            <Pagination
                                count={totalPages}
                                page={parseInt(page, 10)}
                                onChange={handlePageChange}
                                sx={{ display: 'flex', justifyContent: 'center', marginTop: 3, marginBottom: 5 }}
                            />
                            <Grid container spacing={2}>
                                {selectedAnimes.map(anime => (
                                    <Grid item xs={12} key={anime.id}>
                                        <AnimeGalleryCard
                                            animeId={anime.id}
                                            image={anime.image}
                                            title={anime.title}
                                            rating={anime.rating}
                                            description={anime.description}
                                            year={anime.year}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                            <Pagination
                                count={totalPages}
                                page={parseInt(page, 10)}
                                onChange={handlePageChange}
                                sx={{ display: 'flex', justifyContent: 'center', marginTop: 3, marginBottom: 5 }}
                            />
                        </Container>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AnimeGallery;
