import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button, MenuItem, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Select, FormControl, InputLabel } from '@mui/material';
import {useTranslation} from "react-i18next";

const statuses = [
    { id: 1, label: 'Currently Watching' },
    { id: 2, label: 'Completed' },
    { id: 3, label: 'On Hold' },
    { id: 4, label: 'Dropped' },
    { id: 6, label: 'Plan to Watch' },
];

const AnimeListItem = ({ anime, onReviewClick, onEditClick, onDeleteClick }) => {
    const { id, title, status, startDate, endDate, review, image } = anime;
    const [editMode, setEditMode] = useState(false);
    const [newStartDate, setNewStartDate] = useState(startDate);
    const [newStatus, setNewStatus] = useState(status);
    const [newEndDate, setNewEndDate] = useState(endDate || '');
    const { i18n } = useTranslation();

    const getStatusLabel = (statusId) => {
        const statusObj = statuses.find(status => status.id === statusId);
        return statusObj ? statusObj.label : '';
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveEdit = () => {
        // Save changes
        console.log('Save edit for anime:', anime.title);
        setEditMode(false);
        // Send API request to update anime details (startDate, status, endDate)
    };

    const handleCancelEdit = () => {
        setNewStartDate(startDate);
        setNewStatus(status);
        setNewEndDate(endDate || '');
        setEditMode(false);
    };

    const handleDeleteClick = () => {
        // Delete anime
        console.log('Delete anime:', anime.title);
        // Send API request to delete anime
    };

    return (
        <Box sx={{ borderBottom: '1px solid #ccc', marginBottom: 2, paddingBottom: 2, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ marginRight: 2 }}>
                <img src={image} alt={title} style={{ width: 100, height: 'auto' }} />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                {editMode ? (
                    <>
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <InputLabel id={`status-select-label-${id}`}>Status</InputLabel>
                            <Select
                                labelId={`status-select-label-${id}`}
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
                            {i18n.t("Status")}: {getStatusLabel(status)}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {i18n.t("Start Date")}: {startDate}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {i18n.t("End Date")}: {endDate || 'Not completed'}
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
        status: PropTypes.number.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string,
        review: PropTypes.object,
        image: PropTypes.string.isRequired,
    }).isRequired,
    onReviewClick: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
};

export default AnimeListItem;
