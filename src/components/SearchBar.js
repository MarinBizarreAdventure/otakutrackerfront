import React, { useState } from 'react';
import { TextField, Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleSearch = async () => {
        try {
            const requestBody = {
                query: query,
                from: (page - 1) * 10,
                size: 10
            };
            const response = await axios.post('http://localhost:5107/search', requestBody);

            if (response.data.hits) {
                setResults(response.data.hits.hits);
                setTotalPages(Math.ceil(response.data.hits.total.value / 10));
            } else {
                setResults([]);
                setTotalPages(1);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        handleSearch();
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '1000px',
                margin: 'auto',
                marginTop: '20px'
            }}
        >
            <TextField
                id="outlined-search"
                label="Search Anime"
                type="search"
                variant="outlined"
                sx={{ width: '100%', marginBottom: 2 }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant="contained" onClick={handleSearch}>Search</Button>

            {results.length > 0 && (
                <Box sx={{ width: '100%', marginTop: '20px' }}>
                    {results.map((result) => (
                        <Link key={result._id} to={`/anime/${result._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Box sx={{ display: 'flex', border: '1px solid #ccc', padding: '10px', marginBottom: '10px', alignItems: 'center' }}>
                                <img src={result._source.image_url} alt={result._source.name} style={{ width: 100, height: 'auto', marginRight: 10 }} />
                                <Box>
                                    <Typography variant="h6">{result._source.name}</Typography>
                                    <Typography variant="body1">Genres: {result._source.genres}</Typography>
                                    <Typography variant="body2">Rating: {result._source.rating}</Typography>
                                    {/* Add more fields as needed */}
                                </Box>
                            </Box>
                        </Link>
                    ))}
                    <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
                        {Array.from({length: Math.min(totalPages, 10) }, (_, index) => (
                            <Button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                variant={page === index + 1 ? 'contained' : 'outlined'}
                                style={{ margin: '0 5px' }}
                            >
                                {index + 1}
                            </Button>
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default SearchBar;
