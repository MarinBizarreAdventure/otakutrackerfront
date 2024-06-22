import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/Header';
import AnimeList from '../components/AnimeList';
import SearchBar from "../components/SearchBar";
import {useTranslation} from "react-i18next";
import VerticalAnimeList from "../components/AiringAnimeList";

const topAnimes = [
    { animeId: 'cowboy-bebop-1', image: 'https://cdn.myanimelist.net/images/anime/4/19644.jpg', title: 'Cowboy Bebop', rating: 4.5 },
    { animeId: 'jojo-the-movie-2', image: 'https://cdn.myanimelist.net/images/anime/6/14331.jpg', title: 'Jojo: The Movie', rating: 4 },
    { animeId: 'naruto-3', image: 'https://cdn.myanimelist.net/images/anime/7/21569.jpg', title: 'Naruto', rating: 4.2 },
    { animeId: 'attack-on-titan-4', image: 'https://cdn.myanimelist.net/images/anime/12/66961.jpg', title: 'Attack on Titan', rating: 4.8 },
    { animeId: 'death-note-5', image: 'https://cdn.myanimelist.net/images/anime/2/24031.jpg', title: 'Death Note', rating: 4.7 },
    { animeId: 'one-piece-6', image: 'https://cdn.myanimelist.net/images/anime/11/73923.jpg', title: 'One Piece', rating: 4.6 },
    { animeId: 'fullmetal-alchemist-7', image: 'https://cdn.myanimelist.net/images/anime/11/73923.jpg', title: 'Fullmetal Alchemist', rating: 4.9 },
    { animeId: 'bleach-8', image: 'https://cdn.myanimelist.net/images/anime/12/43927.jpg', title: 'Bleach', rating: 4.1 },
    { animeId: 'sword-art-online-9', image: 'https://cdn.myanimelist.net/images/anime/10/18793.jpg', title: 'Sword Art Online', rating: 4.3 },
    { animeId: 'dragon-ball-z-10', image: 'https://cdn.myanimelist.net/images/anime/13/17405.jpg', title: 'Dragon Ball Z', rating: 4.5 },
];

const upcomingAnimes = [
    { animeId: 'trigun-11', image: 'https://cdn.myanimelist.net/images/anime/7/20310.jpg', title: 'Trigun', rating: 3.5 },
    { animeId: 'robin-12', image: 'https://cdn.myanimelist.net/images/anime/1796/91065.jpg', title: 'Robin', rating: 5 },
    { animeId: 'my-hero-academia-13', image: 'https://cdn.myanimelist.net/images/anime/6/73245.jpg', title: 'My Hero Academia', rating: 4.4 },
    { animeId: 'tokyo-ghoul-14', image: 'https://cdn.myanimelist.net/images/anime/3/75576.jpg', title: 'Tokyo Ghoul', rating: 4.3 },
    { animeId: 'demon-slayer-15', image: 'https://cdn.myanimelist.net/images/anime/6/21624.jpg', title: 'Demon Slayer', rating: 4.7 },
    { animeId: 'fairy-tail-16', image: 'https://cdn.myanimelist.net/images/anime/5/53487.jpg', title: 'Fairy Tail', rating: 4.2 },
    { animeId: 'black-clover-17', image: 'https://cdn.myanimelist.net/images/anime/4/75488.jpg', title: 'Black Clover', rating: 4.1 },
    { animeId: 'jujutsu-kaisen-18', image: 'https://cdn.myanimelist.net/images/anime/6/75536.jpg', title: 'Jujutsu Kaisen', rating: 4.5 },
    { animeId: 'hunter-x-hunter-19', image: 'https://cdn.myanimelist.net/images/anime/3/18165.jpg', title: 'Hunter x Hunter', rating: 4.8 },
    { animeId: 'mob-psycho-100-20', image: 'https://cdn.myanimelist.net/images/anime/10/24649.jpg', title: 'Mob Psycho 100', rating: 4.6 },
];

const airingAnimes = [
    { animeId: 'one-piece-6', image: 'https://cdn.myanimelist.net/images/anime/11/73923.jpg', title: 'One Piece', rating: 4.6 },
    { animeId: 'naruto-3', image: 'https://cdn.myanimelist.net/images/anime/7/21569.jpg', title: 'Naruto', rating: 4.2 },
    { animeId: 'dragon-ball-z-10', image: 'https://cdn.myanimelist.net/images/anime/13/17405.jpg', title: 'Dragon Ball Z', rating: 4.5 },
    { animeId: 'bleach-8', image: 'https://cdn.myanimelist.net/images/anime/12/43927.jpg', title: 'Bleach', rating: 4.1 },
    { animeId: 'sword-art-online-9', image: 'https://cdn.myanimelist.net/images/anime/10/18793.jpg', title: 'Sword Art Online', rating: 4.3 },
    { animeId: 'dragon-ball-z-10', image: 'https://cdn.myanimelist.net/images/anime/13/17405.jpg', title: 'Dragon Ball Z', rating: 4.5 }
];



const Home = () => {
    const { i18n } = useTranslation();

    return (
        <Box>
            <Header />
            <SearchBar />
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <Box sx={{ flex: '2 0 0' }}>
                    <AnimeList title={i18n.t("Top Animes")} animes={topAnimes} />
                    <AnimeList title={i18n.t("Upcoming Animes")} animes={upcomingAnimes} />
                </Box>
                <Box sx={{ flex: '1 0 0', marginLeft: 1, marginRight: 5 }}>
                    <VerticalAnimeList title={i18n.t("Airing Animes")} animes={airingAnimes} />
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
