import { useEffect, useState } from "react";
import './App.css';
import MovieCard from "./MovieCard";

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=a8c3e43c';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    };

    useEffect(() => {
        searchMovies('Spiderman');
    }, []);

    return (
        <div className="app">
            <h1>Hello World!</h1>
            <div className="search"> {/* Corrected from <dv> to <div> */}
                <input 
                    placeholder="Search for a movie..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img 
                    src="searchIcon" 
                    alt="search" 
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies.length > 0 ? (
                    <div className="container-wrapper">
                        {movies.map((movies) => (
                            <div className="container" key={movies.imdbID}> {/* Each MovieCard now has its own container */}
                                <MovieCard movies={movies} /> {/* Corrected prop from movies={movies} to movie={movie} */}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No movies found</p>
                )
            }
        </div>
    );
}

export default App;