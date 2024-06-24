import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, CircularProgress } from '@mui/material';
import AnimeListItem from '../components/AnimeListItem';
import Header from "../components/Header";
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import {useAnimeList} from "../contexts/AnimeContext";

const statuses = [
    { id: 1, label: 'Currently Watching' },
    { id: 2, label: 'Completed' },
    { id: 3, label: 'On Hold' },
    { id: 4, label: 'Dropped' },
    { id: 6, label: 'Plan to Watch' },
];

const AnimeListPage = () => {
    const { animeList, fetchAnimeList, addAnimeToList, editAnimeInList, deleteAnimeFromList } = useAnimeList();
    const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
    const [selectedAnime, setSelectedAnime] = useState(null);
    const [stars, setStars] = useState(5); // Default stars rating
    const [reviewComment, setReviewComment] = useState('');
    const [loading, setLoading] = useState(false);
    const { i18n } = useTranslation();

    const openReviewDialog = (anime) => {
        setSelectedAnime(anime);
        setReviewDialogOpen(true);
    };

    const closeReviewDialog = () => {
        setReviewDialogOpen(false);
        setSelectedAnime(null);
        setStars(5);
        setReviewComment('');
    };

    const handleReviewSubmit = () => {
        console.log(`Submitting review for ${selectedAnime.title}: Stars - ${stars}, Comment - ${reviewComment}`);
        closeReviewDialog();
    };

    return (
        <div>
            <Header />
            <Box sx={{ padding: 4, maxWidth: 'lg', margin: 'auto' }}>
                <Typography variant="h4" gutterBottom>
                    {i18n.t("Anime List")}
                </Typography>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    animeList.map(anime => (
                        <AnimeListItem
                            key={anime.animeId}
                            anime={anime}
                            statuses={statuses}
                            onReviewClick={() => openReviewDialog(anime)}
                        />
                    ))
                )}
                <Dialog open={reviewDialogOpen} onClose={closeReviewDialog}>
                    <DialogTitle>{i18n.t("Leave a Review")}</DialogTitle>
                    <DialogContent>
                        <TextField
                            select
                            fullWidth
                            margin="dense"
                            label="Stars"
                            value={stars}
                            onChange={(e) => setStars(parseInt(e.target.value))}
                        >
                            {[...Array(10)].map((_, index) => (
                                <MenuItem key={index + 1} value={index + 1}>{index + 1}</MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            fullWidth
                            margin="dense"
                            label="Review Comment"
                            multiline
                            rows={3}
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeReviewDialog} color="primary">
                            {i18n.t("Cancel")}
                        </Button>
                        <Button onClick={handleReviewSubmit} color="primary">
                            {i18n.t("Review")}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </div>
    );
};

export default AnimeListPage;
