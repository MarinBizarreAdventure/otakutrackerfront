import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Anime from "./pages/Anime";
import AnimeGallery from "./pages/AnimeGallery";
import AnimeList from "./pages/AnimeList";
import {AnimeListProvider} from "./contexts/AnimeContext";

const App = () => {
    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <AnimeListProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/anime/:id" element={<Anime />} />
                        <Route path="/gallery/:page" element={<AnimeGallery />} />
                        <Route path="/list" element={<AnimeList />} />
                    </Routes>
                </Router>
            </AnimeListProvider>
        </ThemeProvider>
    );
};

export default App;
