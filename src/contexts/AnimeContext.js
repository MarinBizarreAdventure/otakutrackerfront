import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "./AuthContext";

const AnimeListContext = createContext();

export const useAnimeList = () => useContext(AnimeListContext);

export const AnimeListProvider = ({ children }) => {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { username } = useAuth();

    useEffect(() => {
        if (username) {
            fetchAnimeList();
        }
    }, [username, ]);

    const fetchAnimeList = () => {
        setLoading(true);
        console.log(username)
        axios.get(`http://localhost:5107/api/AnimeList/${username}`)
            .then(response => {
                setAnimeList(response.data);
            })
            .catch(error => {
                console.error("Error fetching anime list:", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const addAnimeToList = (newAnime) => {
        setLoading(true);
        axios.post('http://localhost:5107/api/AnimeList', newAnime)
            .then(response => {
                console.log("Add Anime Response:", response.data);
                setAnimeList(prevAnimeList => [...prevAnimeList, response.data]);
            })
            .catch(error => {
                console.error("Error adding anime to list:", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const editAnimeInList = (updatedAnime) => {
        setLoading(true);
        axios.put(`http://localhost:5107/api/anime/${updatedAnime.id}`, updatedAnime)
            .then(response => {
                console.log("Edit Anime Response:", response.data);
                const updatedList = animeList.map(anime => (anime.id === updatedAnime.id ? response.data : anime));
                setAnimeList(updatedList);
            })
            .catch(error => {
                console.error("Error editing anime in list:", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const deleteAnimeFromList = (animeId) => {
        setLoading(true);
        axios.delete(`http://localhost:5107/api/AnimeList/${username}/${animeId}`)
            .then(() => {
                const updatedList = animeList.filter(anime => anime.id !== animeId);
                setAnimeList(updatedList);
            })
            .catch(error => {
                console.error("Error deleting anime from list:", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const value = {
        animeList,
        loading,
        error,
        addAnimeToList,
        editAnimeInList,
        deleteAnimeFromList,
    };

    return (
        <AnimeListContext.Provider value={value}>
            {children}
        </AnimeListContext.Provider>
    );
};
