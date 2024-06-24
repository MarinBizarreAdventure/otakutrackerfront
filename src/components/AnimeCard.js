import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Rating, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import {useAuth} from "../contexts/AuthContext";
import {useAnimeList} from "../contexts/AnimeContext";

const StyledCard = styled(Card)(({ theme }) => ({
    margin: 5,
    marginTop: 9,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: `0 8px 16px rgba(0,0,0,0.3)`,
    },
    cursor: 'pointer',
}));

const AnimeCard = ({ animeId }) => {
    const [anime, setAnime] = useState(null);
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState('');
    const [startDate, setStartDate] = useState('');
    const [finishDate, setFinishDate] = useState('');
    const { i18n } = useTranslation();
    const { username } = useAuth();
    const { animeList, fetchAnimeList, addAnimeToList, editAnimeInList, deleteAnimeFromList } = useAnimeList();

    useEffect(() => {
        const fetchAnimeDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5107/api/Gallery/anime/${animeId}`);
                setAnime(response.data);
            } catch (error) {
                console.error('Error fetching anime details:', error);
            }
        };

        fetchAnimeDetails();
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

    if (!anime) return null;

    return (
        <Box sx={{ position: 'relative', marginBottom: 3, maxWidth: '200px' }}>
            <StyledCard>
                <Link to={`/anime/${anime.animeId}`} style={{ textDecoration: 'none', height: 'calc(100% - 40px)', display: 'block' }}>
                    <Box sx={{ position: 'relative', flexGrow: 1 }}>
                        <CardMedia
                            sx={{
                                aspectRatio: '2/3',
                                width: '100%',
                                objectFit: 'cover',
                                objectPosition: 'top',
                            }}
                            component="img"
                            height="100%"
                            image={anime.imageUrl}
                            alt={anime.name}
                        />
                    </Box>
                    <CardContent sx={{ paddingBottom: '1rem' }}>
                        <Typography variant="h7" component="div" sx={{ minHeight: '3rem' }}>
                            {anime.name}
                        </Typography>
                        <Rating value={anime.rating / 6} readOnly sx={{ marginTop: 1, fontSize: '0.875rem' }}/>
                    </CardContent>
                </Link>
                <Button onClick={handleOpen} fullWidth sx={{ borderRadius: '0', backgroundColor: '#3f51b5', color: '#fff' }}>
                    {i18n.t("Add")}
                </Button>
            </StyledCard>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{i18n.t("Add to Favorites")}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Anime ID"
                        type="text"
                        fullWidth
                        value={anime.animeId}
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

export default AnimeCard;
