import React, { useEffect, useState } from 'react';
import { Modal, Tag } from 'antd';




const ModalDetails = (props) => {

    const [movieDetails, setMovieDetails] = useState({})
    const getMovieDetails = async (searchValue) => {
        let url = `http://www.omdbapi.com/?i=${props.modalData.imdbID}&apikey=be727ecb`;
        let response = await fetch(url);
        let responseJson = await response.json();
        setMovieDetails(responseJson)
    }



    useEffect(() => {
        getMovieDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);


    return (
        <>
            <Modal title={movieDetails.Title} open={props.isModalOpen} onCancel={props.handleCancel}>
                <div>
                    <div className='movie-pic'>
                        <img style={{ width: 70 + '%', marginTop: -10 + 'px' }} src={props.modalData.Poster} alt='movie'></img>
                    </div>

                    <div className='movie-descr'>
                        <h5>Plot:</h5>
                        <h6>{movieDetails.Plot}</h6>
                    </div>

                </div>
                <div>
                    <div className='movie-pic'>
                        <h6>Production: <Tag color="processing">{movieDetails.Production}</Tag></h6>
                    </div>
                    <div className='movie-descr'>
                        <h6>Release: {movieDetails.Released}</h6>
                    </div>

                </div>
                <div>

                    <h6>Country: {movieDetails.Country}</h6>
                </div>
                <div>
                    <div>
                        <h6>Awards: <Tag>{movieDetails.Awards}</Tag></h6>
                    </div>
                </div>
                <div>
                    <div>
                        <h6>Actors: {movieDetails.Actors}</h6>
                    </div>
                </div>
                <div>
                    <div className='movie-pic'>
                        <h6>IMDB rating: <Tag color="processing">{movieDetails.imdbRating}</Tag></h6>
                    </div>
                    <div className='movie-descr'>
                        <h6>IMDB votes: {movieDetails.imdbVotes}</h6>
                    </div>

                </div>

            </Modal>
        </>
    );
};

export default ModalDetails;