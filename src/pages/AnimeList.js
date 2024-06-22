import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import AnimeListItem from '../components/AnimeListItem';
import Header from "../components/Header";
import {useTranslation} from "react-i18next";

const statuses = [
    { id: 1, label: 'Currently Watching' },
    { id: 2, label: 'Completed' },
    { id: 3, label: 'On Hold' },
    { id: 4, label: 'Dropped' },
    { id: 6, label: 'Plan to Watch' },
];

const AnimeListPage = () => {
    const [animes, setAnimes] = useState([
        { id: 1, title: 'Anime Title 1', status: 1, startDate: '2023-01-01', endDate: '2023-02-15', review: null, image: 'https://cdn.myanimelist.net/images/anime/10/24649.jpg' },
        { id: 2, title: 'Anime Title 2', status: 2, startDate: '2022-11-15', endDate: '2023-01-05', review: { stars: 8, comment: 'Great anime!' }, image: 'https://cdn.myanimelist.net/images/anime/10/24649.jpg' },
        { id: 3, title: 'Anime Title 3', status: 4, startDate: '2023-03-10', endDate: null, review: null, image: 'https://cdn.myanimelist.net/images/anime/10/24649.jpg' },
    ]);

    const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
    const [selectedAnime, setSelectedAnime] = useState(null);
    const [stars, setStars] = useState(5); // Default stars rating
    const [reviewComment, setReviewComment] = useState('');
    const { i18n } = useTranslation();

    const openReviewDialog = (anime) => {
        setSelectedAnime(anime);
        setReviewDialogOpen(true);
    };

    const closeReviewDialog = () => {
        setReviewDialogOpen(false);
        setSelectedAnime(null);
        setStars(5); // Reset stars rating
        setReviewComment(''); // Reset review comment
    };

    const handleReviewSubmit = () => {
        // Logic to submit review (you can implement this based on your backend integration or local state management)
        console.log(`Submitting review for ${selectedAnime.title}: Stars - ${stars}, Comment - ${reviewComment}`);
        // Close the dialog
        closeReviewDialog();
    };

    return (
        <div>
            <Header />
            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>
                    {i18n.t("Anime List")}
                </Typography>
                {animes.map(anime => (
                    <AnimeListItem
                        key={anime.id}
                        anime={anime}
                        statuses={statuses}
                        onReviewClick={() => openReviewDialog(anime)}
                    />
                ))}
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
