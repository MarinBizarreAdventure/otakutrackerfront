import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button, MenuItem, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Select, FormControl, InputLabel } from '@mui/material';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import {useAnimeList} from "../contexts/AnimeContext";
import {useAuth} from "../contexts/AuthContext";
import {Link} from "react-router-dom";

const statuses = [
    { id: 1, label: 'Currently Watching' },
    { id: 2, label: 'Completed' },
    { id: 3, label: 'On Hold' },
    { id: 4, label: 'Dropped' },
    { id: 6, label: 'Plan to Watch' },
];

const AnimeListItem = ({ anime, onReviewClick, onEditClick, onDeleteClick }) => {
    const { animeList, fetchAnimeList, addAnimeToList, editAnimeInList, deleteAnimeFromList } = useAnimeList();
    const { animeId, title, imageUrl, watchingStatus, myStartDate, myFinishDate, myTags } = anime;
    const [editMode, setEditMode] = useState(false);
    const [newStartDate, setNewStartDate] = useState(myStartDate);
    const [newStatus, setNewStatus] = useState(watchingStatus);
    const [newEndDate, setNewEndDate] = useState(myFinishDate || '');
    const { i18n } = useTranslation();
    const { username } = useAuth();

    const getStatusLabel = (statusId) => {
        const statusObj = statuses.find(status => status.id === statusId);
        return statusObj ? statusObj.label : '';
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveEdit = async () => {
        try {
            const response = await axios.put(`http://localhost:5107/api/anime/${animeId}`, {
                username: 'lumi',
                animeId: animeId,
                watchingStatus: newStatus,
                myStartDate: newStartDate,
                myFinishDate: newEndDate,
                myTags: myTags
            });
            console.log('Save edit for anime:', anime.title);
            setEditMode(false);
        } catch (error) {
            console.error('Error saving anime edit:', error);
        }
    };

    const handleCancelEdit = () => {
        setNewStartDate(myStartDate);
        setNewStatus(watchingStatus);
        setNewEndDate(myFinishDate || '');
        setEditMode(false);
    };

    const handleDeleteClick = async () => {
        try {
            await axios.delete(`http://localhost:5107/api/AnimeList/${username}/${animeId}`);
            console.log('Delete anime:', anime.title);
            onDeleteClick(animeId);
        } catch (error) {
            console.error('Error deleting anime:', error);
        }
    };

    return (
        <Box sx={{ borderBottom: '1px solid #ccc', marginBottom: 2, paddingBottom: 2, display: 'flex', alignItems: 'center' }}>
            <Link to={`/anime/${animeId}`} style={{ textDecoration: 'none' }}>
                <Box sx={{ marginRight: 2 }}>
                    <img src={imageUrl} alt={title} style={{ width: 100, height: 'auto' }} />
                </Box>
            </Link>
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                {editMode ? (
                    <>
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <InputLabel id={`status-select-label-${animeId}`}>Status</InputLabel>
                            <Select
                                labelId={`status-select-label-${animeId}`}
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value)}
                                label="Status"
                            >
                                {statuses.map((status) => (
                                    <MenuItem key={status.id} value={status.id}>
                                        {status.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            type="date"
                            label="Start Date"
                            value={newStartDate}
                            onChange={(e) => setNewStartDate(e.target.value)}
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            fullWidth
                            type="date"
                            label="End Date"
                            value={newEndDate}
                            onChange={(e) => setNewEndDate(e.target.value)}
                            sx={{ marginBottom: 2 }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 1 }}>
                            <Button variant="contained" onClick={handleSaveEdit} sx={{ marginRight: 1 }}>
                                {i18n.t("Save")}
                            </Button>
                            <Button variant="outlined" onClick={handleCancelEdit}>
                                {i18n.t("Cancel")}
                            </Button>
                        </Box>
                    </>
                ) : (
                    <>
                        <Typography variant="body1" gutterBottom>
                            {i18n.t("Status")}: {getStatusLabel(watchingStatus)}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {i18n.t("Start Date")}: {myStartDate}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {i18n.t("End Date")}: {myFinishDate || 'Not completed'}
                        </Typography>
                        <Box sx={{ marginTop: 1 }}>
                            <Button variant="outlined" onClick={onReviewClick} sx={{ marginRight: 1 }}>
                                {i18n.t("Review")}
                            </Button>
                            <Button variant="outlined" onClick={handleEditClick} sx={{ marginRight: 1 }}>
                                {i18n.t("Edit")}
                            </Button>
                            <Button variant="outlined" onClick={handleDeleteClick}>
                                {i18n.t("Delete")}
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    );
};

AnimeListItem.propTypes = {
    anime: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        watchingStatus: PropTypes.number.isRequired,
        myStartDate: PropTypes.string.isRequired,
        myFinishDate: PropTypes.string,
        myTags: PropTypes.string,
        image: PropTypes.string.isRequired,
    }).isRequired,
    onReviewClick: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
};

export default AnimeListItem;
