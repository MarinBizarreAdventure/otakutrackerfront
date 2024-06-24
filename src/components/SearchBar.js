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
            // const response = await axios.post('http://your-elasticsearch-url/search', requestBody);

            const res = {
                "took": 138,
                "timed_out": false,
                "_shards": {
                    "total": 1,
                    "successful": 1,
                    "skipped": 0,
                    "failed": 0
                },
                "hits": {
                    "total": {
                        "value": 6036,
                        "relation": "eq"
                    },
                    "max_score": 14.169985,
                    "hits": [
                        {
                            "_index": "anime",
                            "_id": "14813",
                            "_score": 11.3619585,
                            "_ignored": [
                                "synopsis.keyword"
                            ],
                            "_source": {
                                "score_1": 884,
                                "score_10": 78963,
                                "name": "Yahari Ore no Seishun Love Comedy wa Machigatteiru.",
                                "rating": "PG-13 - Teens 13 or older",
                                "popularity": 72,
                                "ranked": 458,
                                "score_7": 113872,
                                "completed": 726380,
                                "score_8": 199230,
                                "studios": "Brain's Base",
                                "members": 971934,
                                "japanese_name": "やはり俺の青春ラブコメはまちがっている。",
                                "anime_id": 14813,
                                "score_6": 33982,
                                "score_4": 4186,
                                "score": 8,
                                "aired": "Apr 5, 2013 to Jun 28, 2013",
                                "genres": "Slice of Life,Comedy,Drama,Romance,School",
                                "score_5": 12210,
                                "episodes": 13,
                                "source": "Light novel",
                                "type": "TV",
                                "synopsis": "Hachiman Hikigaya is an apathetic high school student with narcissistic and semi-nihilistic tendencies. He firmly believes that joyful youth is nothing but a farce, and everyone who says otherwise is just lying to themselves. In a novel punishment for writing an essay mocking modern social relationships, Hachiman's teacher forces him to join the Volunteer Service Club, a club that aims to extend a helping hand to any student who seeks their support in achieving their goals. With the only other club member being the beautiful ice queen Yukino Yukinoshita, Hachiman finds himself on the front line of other people's problems—a place he never dreamed he would be. As Hachiman and Yukino use their wits to solve many students' problems, will Hachiman's rotten view of society prove to be a hindrance or a tool he can use to his advantage?",
                                "plan_to_watch": 174610,
                                "duration": "24 min. per ep.",
                                "dropped": 13524,
                                "watching": 40893,
                                "score_2": 746,
                                "premiered": "Spring 2013",
                                "producers": "Geneon Universal Entertainment, TBS, Delfi Sound, Marvelous AQL, Atelier Musa",
                                "on_hold": 16527,
                                "score_9": 134774,
                                "licensors": "Sentai Filmworks",
                                "favorites": 29425,
                                "image_url": "https://cdn.myanimelist.net/images/anime/11/49459.jpg",
                                "score_3": 1493,
                                "english_name": "My Teen Romantic Comedy SNAFU"
                            }
                        },
                        {
                            "_index": "anime",
                            "_id": "33161",
                            "_score": 11.232134,
                            "_source": {
                                "score_1": 130,
                                "score_10": 14843,
                                "name": "Yahari Ore no Seishun Love Comedy wa Machigatteiru. Zoku OVA",
                                "rating": "PG-13 - Teens 13 or older",
                                "popularity": 865,
                                "ranked": 432,
                                "score_7": 19968,
                                "completed": 143746,
                                "score_8": 36032,
                                "studios": "feel.",
                                "members": 171668,
                                "japanese_name": "やはり俺の青春ラブコメはまちがっている. 続 きっと, 女の子はお砂糖とスパイスと素敵な何かでできている。",
                                "anime_id": 33161,
                                "score_6": 5347,
                                "score_4": 442,
                                "score": 8,
                                "aired": "Oct 27, 2016",
                                "genres": "Comedy,Romance,School",
                                "score_5": 1787,
                                "episodes": 1,
                                "source": "Light novel",
                                "type": "OVA",
                                "synopsis": "Bundled with 5pb's Yahari Game Demo Ore no Seishun Love Comedy wa Machigatteiru. Zoku game for the PlayStation Vita. It adapts a story focusing on Iroha Isshiki from volume 10.5 of the original light novel.",
                                "plan_to_watch": 23108,
                                "duration": "23 min.",
                                "dropped": 497,
                                "watching": 3436,
                                "score_2": 96,
                                "premiered": "Unknown",
                                "producers": "5pb.",
                                "on_hold": 881,
                                "score_9": 22504,
                                "licensors": "feel.",
                                "favorites": 1822,
                                "image_url": "https://cdn.myanimelist.net/images/anime/13/84052.jpg",
                                "score_3": 167,
                                "english_name": "Unknown"
                            }
                        }]
                }
            };

            if (res.hits) {
                setResults(res.hits.hits);
                setTotalPages(Math.ceil(res.hits.total.value / 10));
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
