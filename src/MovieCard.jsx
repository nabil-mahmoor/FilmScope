import React from "react";

const MovieCard = ({ movie }) => {
    return (
        <div className="movie">
            <div>
                <p>{movie.release_date.split('-')[0]}</p>
            </div>
            <div>
                <img src={movie.poster_path != null ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/400'} alt={movie.title} />
            </div>
            <div>
                <span>
                    <i class="fa-solid fa-star"></i>
                    {Math.round(movie.vote_average * 10) / 10}
                </span>
                <h3>{movie.title}</h3>
            </div>
        </div>
    )
}

export default MovieCard;