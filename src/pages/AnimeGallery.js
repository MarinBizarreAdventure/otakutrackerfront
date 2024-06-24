import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Pagination, Container, Grid, Button, Box } from '@mui/material';
import AnimeGalleryCard from '../components/AnimeGalleryCard';
import Header from '../components/Header';
import { useTranslation } from "react-i18next";
import axios from 'axios';

const genres = [
    "Adventure", "Sci-Fi", "Mystery", "Sports", "Mecha", "Music", "Military", "Cars",
    "Vampire", "Game", "Horror", "Josei", "Slice of Life", "Police", "Ecchi", "Magic",
    "Shoujo", "Space", "Comedy", "Shoujo Ai", "Fantasy", "Drama", "Samurai", "Harem",
    "Demons", "Romance", "Historical", "Thriller", "Martial Arts", "Dementia",
    "Supernatural", "School", "Action", "Shounen", "Psychological", "Super Power", "Seinen"
];

const AnimeGallery = () => {
    const { page } = useParams();
    const [animeIds, setAnimeIds] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const itemsPerPage = 15;
    const { i18n } = useTranslation();

    useEffect(() => {
        const fetchAnimeIds = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5107/api/Gallery/${page}?pageSize=${itemsPerPage}`);
                setAnimeIds(response.data);
                setTotalPages(Math.ceil(100 / itemsPerPage));
            } catch (error) {
                console.error("Error fetching anime data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnimeIds();
    }, [page]);

    const handlePageChange = (event, value) => {
        navigate(`/gallery/${value}`);
    };

    return (
        <Box sx={{ overflowY: 'hidden', maxHeight: 'calc(100vh - 64px)' }}>
            <Header />
            <Grid container sx={{ maxWidth: 'lg', margin: 'auto'}}>
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
                                {animeIds.map(id => (
                                    <Grid item xs={12} key={id}>
                                        <AnimeGalleryCard animeId={id} />
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
