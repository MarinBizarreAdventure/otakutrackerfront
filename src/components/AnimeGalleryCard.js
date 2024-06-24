import React, { useState, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, Rating, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import {Link} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";
import {useAnimeList} from "../contexts/AnimeContext";

const StyledCard = styled(Card)(({ theme }) => ({
    width: '100%',
    margin: 5,
    display: 'flex',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: `0 8px 16px rgba(0,0,0,0.3)`,
    },
    cursor: 'pointer',
}));

const AnimeGalleryCard = ({ animeId }) => {
    const [animeData, setAnimeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState('');
    const [startDate, setStartDate] = useState('');
    const [finishDate, setFinishDate] = useState('');
    const { i18n } = useTranslation();
    const { username } = useAuth();
    const { animeList, fetchAnimeList, addAnimeToList, editAnimeInList, deleteAnimeFromList } = useAnimeList();

    useEffect(() => {
        const fetchAnimeData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5107/api/Gallery/anime/${animeId}`);
                setAnimeData(response.data);
            } catch (error) {
                console.error("Error fetching anime data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnimeData();
    }, [animeId]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleAdd = () => {
        const data = {
            username: username,
            animeId: animeId,
            score: 4,
            watchingStatus: status,
            watchedEpisodes: 0,
            myStartDate: startDate,
            myFinishDate: finishDate,
            myRewatching: 0,
            myRewatchingEp: 0,
            myLastUpdated: new Date().toISOString(),
            myTags: "string"
        };
        addAnimeToList(data);

        handleClose();
    };

    const truncateSynopsis = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength) + '...';
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ position: 'relative' }}>
            <StyledCard>
                <Link to={`/anime/${animeId}`}>
                <Box sx={{ flex: '1 1 40%' }}>
                    <CardMedia
                        sx={{ aspectRatio: '2/3', height: '100%' }}
                        component="img"
                        image={animeData?.imageUrl || 'https://via.placeholder.com/300'}
                        alt={animeData?.name || 'Unknown'}
                    />
                </Box>
                </Link>
                <Box sx={{ flex: '1 1 60%', padding: 2 }}>
                    <CardContent>
                        <Link to={`/anime/${animeId}`}>
                        <Typography variant="h6" component="div">
                            {animeData?.name || 'Unknown'}
                        </Typography>
                        <Rating value={animeData?.rating ? animeData.rating / 2 : 0} readOnly sx={{ marginY: 1, fontSize: '1rem' }}/>
                        <Typography variant="body2" color="text.secondary">
                            {truncateSynopsis(animeData?.synopsis || 'No synopsis available', 100)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {i18n.t("Year")}: {animeData?.premiered || 'Unknown'}
                        </Typography>
                        </Link>
                    </CardContent>
                    <Button onClick={handleOpen} fullWidth sx={{ marginTop: 'auto', backgroundColor: '#3f51b5', color: '#fff' }}>
                        {i18n.t("Add")}
                    </Button>
                </Box>
                {/*</Link>*/}
            </StyledCard>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{i18n.t("Add to Favorites")}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Anime ID"
                        type="text"
                        fullWidth
                        value={animeId}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        select
                        margin="dense"
                        label="Status"
                        fullWidth
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <MenuItem value={1}>{i18n.t("Currently Watching")}</MenuItem>
                        <MenuItem value={2}>{i18n.t("Completed")}</MenuItem>
                        <MenuItem value={3}>{i18n.t("On Hold")}</MenuItem>
                        <MenuItem value={4}>{i18n.t("Dropped")}</MenuItem>
                        <MenuItem value={6}>{i18n.t("Plan to Watch")}</MenuItem>
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
                    <Button onClick={handleClose} color="primary">
                        {i18n.t("Cancel")}
                    </Button>
                    <Button onClick={handleAdd} color="primary">
                        {i18n.t("Add")}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AnimeGalleryCard;
