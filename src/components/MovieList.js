import React, { useState } from 'react';
import { Button } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import ModalDetails from '../components/ModalDetails';


const MovieList = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalData, setModalData] = useState(null)
    const FavouriteComponent = props.favouriteComponent;


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    if (props.movies) {
        return (
            <>
                {props.movies.map((movie, index) => (
                    <div key={index} className='image-container d-flex justify-content-start m-3'>
                        <img src={movie.Poster} alt='movie'></img>
                        <div
                            className='overlay d-flex align-items-center justify-content-center'>
                            <Button style={{ float: 'right' }} onClick={() => props.handleFavouritesClick(movie)}>
                                <FavouriteComponent />
                            </Button>
                            <Button style={{ float: 'left' }} type="primary" onClick={() => {
                                showModal();
                                setModalData(movie)
                            }} >
                                <InfoCircleOutlined />
                            </Button>

                        </div>
                    </div>
                ))}

                {modalData &&
                    <ModalDetails modalData={modalData} isModalOpen={isModalOpen} handleCancel={handleCancel} />
                }
            </>
        );
    }

};

export default MovieList;