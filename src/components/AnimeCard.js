import React from 'react';
import { Card, CardMedia, CardContent, Typography, Rating } from '@mui/material';

const AnimeCard = ({ image, title, rating }) => {
    return (
        <Card sx={{ maxWidth: 200, margin: 2 }}>
            <CardMedia
                component="img"
                height="300"
                image={image}
                alt={title}
            />
            <CardContent>
                <Typography variant="h6" component="div">
                    {title}
                </Typography>
                <Rating value={rating} readOnly />
            </CardContent>
        </Card>
    );
};

export default AnimeCard;
