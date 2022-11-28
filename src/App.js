import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from '../src/components/MovieList';
import MovieListHeading from '../src/components/MovieListHeading';
import SearchBox from '../src/components/SearchBox';
import AddFavourites from '../src/components/AddFavourites';
import RemoveFavourites from '../src/components/RemoveFavourites';
import { Radio } from 'antd';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [currentFilter, setCurrentFilter] = useState('title')


    const getMovieRequest = async (searchValue) => {
        let url = ''
        if (currentFilter === 'title') {
            url = `http://www.omdbapi.com/?s=${searchValue}&apikey=be727ecb`;
        } else if (currentFilter === 'year') {
            url = `http://www.omdbapi.com/?y=${searchValue}&apikey=be727ecb`;
        } else if (currentFilter === 'imdb') {
            url = `http://www.omdbapi.com/?i=${searchValue}&apikey=be727ecb`;
        }

        let response = await fetch(url);
        let responseJson = await response.json();

        if (currentFilter === 'title') {
            if (responseJson.Search) {
                setMovies(responseJson.Search);
            }
        } else if (currentFilter === 'year') {
            url = `http://www.omdbapi.com/?y=${searchValue}&apikey=be727ecb`;
        } else if (currentFilter === 'imdb') {
            let objAux = []
            objAux.push(responseJson)
            setMovies(objAux)
        }

    };

    const handleOnChangeFilter = (e) => {
        setCurrentFilter(e.target.value);
    };

    useEffect(() => {
        getMovieRequest(searchValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue]);

    useEffect(() => {
        getMovieRequest(searchValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentFilter]);

    useEffect(() => {

        const movieFavourites = JSON.parse(
            localStorage.getItem('react-movie-app-favourites')
        );

        setFavourites(movieFavourites);


    }, []);

    const saveToLocalStorage = (items) => {
        localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
    };


    const addFavouriteMovie = (movie) => {
        const newFavouriteList = [...favourites, movie];
        setFavourites(newFavouriteList);
        saveToLocalStorage(newFavouriteList);
    };

    const removeFavouriteMovie = (movie) => {
        const newFavouriteList = favourites.filter(
            (favourite) => favourite.imdbID !== movie.imdbID
        );

        setFavourites(newFavouriteList);
        saveToLocalStorage(newFavouriteList);
    };

    return (
        <div className='container-fluid movie-app'>
            <div className='row d-flex align-items-center mt-4 mb-4'>
                <MovieListHeading heading='Movies' />
                <Radio.Group buttonStyle="solid" optionType="button" onChange={handleOnChangeFilter} defaultValue="title">
                    <Radio.Button value="title">Title</Radio.Button>
                    <Radio.Button value="year">Year</Radio.Button>
                    <Radio.Button value="imdb">IMDB ID</Radio.Button>
                </Radio.Group>
                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
            </div>
            <div className='row'>
                <MovieList
                    movies={movies}
                    handleFavouritesClick={addFavouriteMovie}
                    favouriteComponent={AddFavourites}

                />
            </div>
            <div className='row d-flex align-items-center mt-4 mb-4'>
                <MovieListHeading heading='Favourites' />
            </div>
            <div className='row'>
                <MovieList
                    movies={favourites}
                    handleFavouritesClick={removeFavouriteMovie}
                    favouriteComponent={RemoveFavourites}
                />
            </div>
        </div>
    );
};

export default App;