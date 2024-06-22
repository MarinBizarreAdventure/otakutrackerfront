import React, { useState } from 'react';
import { Grid, Typography, Paper, Link, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import Header from "../components/Header";
import {useTranslation} from "react-i18next";

const Anime = ({ anime }) => {
    const {
        title,
        synonyms,
        type,
        episodes,
        status,
        aired,
        premiered,
        broadcast,
        producers,
        licensors,
        studios,
        source,
        genres,
        demographic,
        duration,
        rating,
        score,
        popularity,
        members,
        favorites,
        officialSite,
        resources,
        streamingPlatforms,
        synopsis,
        background,
        coverImage,
    } = {
        title: 'One Piece',
        synonyms: ['OP'],
        type: 'TV',
        episodes: 'Unknown',
        status: 'Currently Airing',
        aired: 'Oct 20, 1999 to ?',
        premiered: 'Fall 1999',
        broadcast: 'Sundays at 09:30 (JST)',
        producers: ['Fuji TV', 'TAP', 'Shueisha'],
        licensors: ['Funimation', '4Kids Entertainment'],
        studios: ['Toei Animation'],
        source: 'Manga',
        genres: ['Action', 'Adventure', 'Fantasy'],
        demographic: 'Shounen',
        duration: '24 min.',
        rating: 'PG-13 - Teens 13 or older',
        score: 8.721,
        popularity: 19,
        members: 2376631,
        favorites: 222911,
        officialSite: 'https://myanimelist.net/anime/21/One_Piece',
        resources: [
            { name: 'AniDB', url: 'https://anidb.net/anime/21' },
            { name: 'ANN', url: 'https://www.animenewsnetwork.com/encyclopedia/anime.php?id=21' },
        ],
        streamingPlatforms: [
            { name: 'Crunchyroll', url: 'https://www.crunchyroll.com/one-piece' },
            { name: 'Funimation', url: 'https://www.funimation.com/shows/one-piece/' },
        ],
        synopsis: `Barely surviving in a barrel after passing through a terrible whirlpool at sea, carefree Monkey D. Luffy ends up aboard a ship under attack by fearsome pirates. Despite being a naive-looking teenager, he is not to be underestimated. Unmatched in battle, Luffy is a pirate himself who resolutely pursues the coveted One Piece treasure and the King of the Pirates title that comes with it.

The late King of the Pirates, Gol D. Roger, stirred up the world before his death by disclosing the whereabouts of his hoard of riches and daring everyone to obtain it. Ever since then, countless powerful pirates have sailed dangerous seas for the prized One Piece only to never return. Although Luffy lacks a crew and a proper ship, he is endowed with a superhuman ability and an unbreakable spirit that make him not only a formidable adversary but also an inspiration to many.

As he faces numerous challenges with a big smile on his face, Luffy gathers one-of-a-kind companions to join him in his ambitious endeavor, together embracing perils and wonders on their once-in-a-lifetime adventure.`,
        background: `Several anime-original arcs have been adapted into light novels, and the series has inspired 50+ video games as of 2023.

In June 2004, One Piece was licensed in North America by 4Kids Entertainment, which partnered with Viz Media for home video distribution. As One Piece proved unsuitable for their target demographic, 4Kids Entertainment censored the show to meet their standards, and, in December 2006, they stopped its production. In April 2007, Funimation took over the series licensing, providing an uncut version that remained faithful to the original release.

In Japan, the anime's first 574 episodes were released exclusively on DVD by Avex Pictures from February 21, 2001, to December 4, 2013. Blu-rays also became available with the DVDs starting on January 8, 2014. In North America, Viz Media released the anime on DVD between February 28, 2006, and June 26, 2007. Funimation has re-released and continued the series since May 27, 2008. From March 23, 2021, the DVDs were accompanied by Blu-rays as well.`,
        coverImage: 'https://cdn.myanimelist.net/images/anime/11/73923.jpg',
    };

    const [open, setOpen] = useState(false);
    const [addStatus, setAddStatus] = useState('');
    const [startDate, setStartDate] = useState('');
    const [finishDate, setFinishDate] = useState('');
    const { i18n } = useTranslation();

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleAddToFavorites = () => {
        // TODO: Implement logic to add anime to favorites
        console.log('Adding anime to favorites:', title);
        console.log('Status:', addStatus);
        console.log('Start Date:', startDate);
        console.log('Finish Date:', finishDate);
        handleCloseDialog();
    };

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <Paper elevation={3} className="w-full max-w-5xl p-6 rounded-md bg-white">
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <img src={coverImage} alt={title} className="rounded-lg w-full h-auto mb-4" />
                            <Typography variant="h4" align="center" gutterBottom>
                                {title}
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
                                <strong>{i18n.t("Alternative Titles")}:</strong> {synonyms.join(', ')}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                <strong>{i18n.t("Type")}:</strong> {type}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                <strong>{i18n.t("Episodes")}:</strong> {episodes}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                <strong>{i18n.t("Status")}:</strong> {status}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                <strong>{i18n.t("Aired")}:</strong> {aired}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                <strong>{i18n.t("Premiered")}:</strong> {premiered}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                <strong>{i18n.t("Broadcast")}:</strong> {broadcast}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                <strong>{i18n.t("Producers")}:</strong> {producers.join(', ')}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                <strong>{i18n.t("Licensors")}:</strong> {licensors.join(', ')}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                <strong>{i18n.t("Studios")}:</strong> {studios.join(', ')}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                <strong>{i18n.t("Source")}:</strong> {source}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                <strong>{i18n.t("Genres")}:</strong> {genres.join(', ')}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                <strong>{i18n.t("Demographic")}:</strong> {demographic}
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
                                {i18n.t("Background")}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {background}
                            </Typography>

                            <Typography variant="h6" gutterBottom>
                                {i18n.t("Available At")}
                            </Typography>
                            <Link href={officialSite} target="_blank" rel="noopener">
                                {i18n.t("Official Site")}
                            </Link>

                            <Typography variant="h6" gutterBottom>
                                {i18n.t("Resources")}
                            </Typography>
                            {resources.map((resource, index) => (
                                <Link key={index} href={resource.url} target="_blank" rel="noopener">
                                    {resource.name}
                                </Link>
                            ))}

                            <Typography variant="h6" gutterBottom>
                                {i18n.t("Streaming Platforms")}
                            </Typography>
                            {streamingPlatforms.map((platform, index) => (
                                <Typography key={index} variant="body1" paragraph>
                                    <Link href={platform.url} target="_blank" rel="noopener">
                                        {platform.name}
                                    </Link>
                                </Typography>
                            ))}
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
