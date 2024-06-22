import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Rating, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import {useTranslation} from "react-i18next";

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

const AnimeGalleryCard = ({ animeId, image, title, rating, description, year }) => {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState('');
    const [startDate, setStartDate] = useState('');
    const [finishDate, setFinishDate] = useState('');
    const { i18n } = useTranslation();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = () => {
        console.log('Adding anime to favorites:', animeId);
        console.log('Status:', status);
        console.log('Start Date:', startDate);
        console.log('Finish Date:', finishDate);
        handleClose();
    };

    return (
        <Box sx={{ position: 'relative' }}>
            <StyledCard>
                <Box sx={{ flex: '1 1 40%' }}>
                    <CardMedia
                        sx={{ aspectRatio: '2/3', height: '100%' }}
                        component="img"
                        image={image}
                        alt={title}
                    />
                </Box>
                <Box sx={{ flex: '1 1 60%', padding: 2 }}>
                    <CardContent>
                        <Typography variant="h6" component="div">
                            {title}
                        </Typography>
                        <Rating value={rating} readOnly sx={{ marginY: 1, fontSize: '1rem' }}/>
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {i18n.t("Year")}: {year}
                        </Typography>
                    </CardContent>
                    <Button onClick={handleOpen} fullWidth sx={{ marginTop: 'auto', backgroundColor: '#3f51b5', color: '#fff' }}>
                        {i18n.t("Add")}
                    </Button>
                </Box>
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
