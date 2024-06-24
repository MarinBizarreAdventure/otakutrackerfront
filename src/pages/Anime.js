import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Paper, Link, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import Header from "../components/Header";
import { useTranslation } from "react-i18next";
import {useAnimeList} from "../contexts/AnimeContext";
import {useAuth} from "../contexts/AuthContext";

const Anime = () => {
    const { id } = useParams();
    const [anime, setAnime] = useState(null);
    const [open, setOpen] = useState(false);
    const [addStatus, setAddStatus] = useState('');
    const [startDate, setStartDate] = useState('');
    const [finishDate, setFinishDate] = useState('');
    const { i18n } = useTranslation();
    const { animeList, fetchAnimeList, addAnimeToList, editAnimeInList, deleteAnimeFromList } = useAnimeList();
    const { username } = useAuth();

    useEffect(() => {
        const fetchAnime = async () => {
            try {
                const response = await axios.get(`http://localhost:5107/api/Anime/${id}`);
                setAnime(response.data);
            } catch (error) {
                console.error("Error fetching anime data:", error);
            }
        };

        fetchAnime();
    }, [id]);

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleAddToFavorites = () => {

        const handleAdd = () => {
            const data = {
                username: username,
                animeId: animeId,
                score: 4,
                watchingStatus: addStatus,
                watchedEpisodes: 0,
                myStartDate: startDate,
                myFinishDate: finishDate,
                myRewatching: 0,
                myRewatchingEp: 0,
                myLastUpdated: new Date().toISOString(),
                myTags: "string"
            };
            addAnimeToList(data);
        };
        handleCloseDialog();
    };

    if (!anime) {
        return <div>Loading...</div>;
    }

    const {
        animeId,
        name,
        englishName,
        japaneseName,
        imageUrl,
        type,
        episodes,
        aired,
        premiered,
        producers,
        licensors,
        studios,
        source,
        duration,
        synopsis,
        rating,
        ranked,
        popularity,
        members,
        favorites,
        watching,
        completed,
        onHold,
        dropped,
        planToWatch,
    } = anime;

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <Paper elevation={3} className="w-full max-w-5xl p-6 rounded-md bg-white">
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <img src={imageUrl} alt={name} className="rounded-lg w-full h-auto mb-4" />
                            <Typography variant="h4" align="center" gutterBottom>
                                {name}
                            </Typography>
                            <Button
                                onClick={handleOpenDialog}
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 3, marginBottom: 4 }}
                            >
                                {i18n.t("Add to Favorites")}
                            </Button>
                            <Typography variant="body1" paragraph>
                                <strong>{i18n.t("English Title")}:</strong> {englishName}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                <strong>{i18n.t("Japanese Title")}:</strong> {japaneseName}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                <strong>{i18n.t("Type")}:</strong> {type}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                <strong>{i18n.t("Episodes")}:</strong> {episodes}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                <strong>{i18n.t("Aired")}:</strong> {aired}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                <strong>{i18n.t("Premiered")}:</strong> {premiered}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                <strong>{i18n.t("Producers")}:</strong> {producers}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                <strong>{i18n.t("Licensors")}:</strong> {licensors}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                <strong>{i18n.t("Studios")}:</strong> {studios}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                <strong>{i18n.t("Source")}:</strong> {source}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                <strong>{i18n.t("Duration")}:</strong> {duration}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                <strong>{i18n.t("Rating")}:</strong> {rating}
                            </Typography>
                        </Grid>

                        {/* Right Side - Description */}
                        <Grid item xs={12} md={8}>
                            <Typography variant="h6" gutterBottom>
                                {i18n.t("Synopsis")}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {synopsis}
                            </Typography>

                            <Typography variant="h6" gutterBottom>
                                {i18n.t("Ranked")}:
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {ranked}
                            </Typography>

                            <Typography variant="h6" gutterBottom>
                                {i18n.t("Popularity")}:
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {popularity}
                            </Typography>

                            <Typography variant="h6" gutterBottom>
                                {i18n.t("Members")}:
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {members}
                            </Typography>

                            <Typography variant="h6" gutterBottom>
                                {i18n.t("Favorites")}:
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {favorites}
                            </Typography>

                            <Typography variant="h6" gutterBottom>
                                {i18n.t("Watching")}:
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {watching}
                            </Typography>

                            <Typography variant="h6" gutterBottom>
                                {i18n.t("Completed")}:
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {completed}
                            </Typography>

                            <Typography variant="h6" gutterBottom>
                                {i18n.t("On Hold")}:
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {onHold}
                            </Typography>

                            <Typography variant="h6" gutterBottom>
                                {i18n.t("Dropped")}:
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {dropped}
                            </Typography>

                            <Typography variant="h6" gutterBottom>
                                {i18n.t("Plan to Watch")}:
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {planToWatch}
                            </Typography>
                        </Grid>
                    </Grid>

                    {/* Dialog for Adding to Favorites */}
                    <Dialog open={open} onClose={handleCloseDialog}>
                        <DialogTitle>Add to Favorites</DialogTitle>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                label="Status"
                                select
                                fullWidth
                                value={addStatus}
                                onChange={(e) => setAddStatus(e.target.value)}
                            >
                                <MenuItem value={1}>Currently Watching</MenuItem>
                                <MenuItem value={2}>Completed</MenuItem>
                                <MenuItem value={3}>On Hold</MenuItem>
                                <MenuItem value={4}>Dropped</MenuItem>
                                <MenuItem value={6}>Plan to Watch</MenuItem>
                            </TextField>
                            <TextField
                                margin="dense"
                                label="Start Date"
                                type="date"
                                fullWidth
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                margin="dense"
                                label="Finish Date"
                                type="date"
                                fullWidth
                                value={finishDate}
                                onChange={(e) => setFinishDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleAddToFavorites} color="primary">
                                Add
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Paper>
            </div>
        </div>
    );
};

export default Anime;
