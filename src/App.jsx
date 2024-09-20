import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import SearchIcon from './assets/search.svg'
import './App.css';

const DISCOVER_URL = 'https://api.themoviedb.org/3/discover/movie?';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?query=';
const API_KEY = 'api_key=11638f1fcc10907ee42fb361a47e5a7c';

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);

    const searchMovies = async (title) => {

        const response = await (title == '' ? fetch(`${DISCOVER_URL}${API_KEY}`) : fetch(`${SEARCH_URL}${title}&${API_KEY}`));
        const data = await response.json();
        setMovies(data.results);
    }

    useEffect(() => {
        searchMovies('')
    }, [])

    return (
        <div className="app">
            <h1>
                <i class="fa-solid fa-camera-movie"></i>
                FilmScope
            </h1>

            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm.replace(/\s/g, '+'))}
                />
            </div>

            {
                movies?.length > 0
                    ? (
                        <div className="container">
                            {movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty">
                            <h2>No movies found</h2>
                        </div>
                    )
            }

        </div>
    );
}

export default App;