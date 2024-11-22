import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import API_KEY from "./apikey";
import SearchIcon from './assets/search.svg'
import './App.css';

const DISCOVER_URL = 'https://api.themoviedb.org/3/discover/movie?';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?query=';

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
            <header>
                <h1>
                    <i class="fa-light fa-clapperboard-play"></i>
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
            </header>

            <div className="content">
                {
                    movies?.length > 0
                        ? (
                            <div className="container">
                                {movies.sort((a, b) => {
                                    if ((a.vote_average > b.vote_average) && (a.release_date > b.release_date)) {
                                        return -1;
                                    }
                                }).map((movie) => (
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

        </div>
    );
}

export default App;