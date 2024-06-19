import React from 'react';
import {useParams} from "react-router-dom";

const Anime = () => {
    const { anime } = useParams();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">{anime}</h1>
        </div>
    );
};

export default Anime;
