import React, { useState, useEffect } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

import { fetchPictures, normalizedImages, perPage } from 'components/API/API';

import css from './App.module.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    if (query !== '' || page !== 1) {
      fetchImages();
    }
    // eslint-disable-next-line
  }, [query, page]);

  const handleSearch = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setError(null);
  };

  const fetchImages = () => {
    setIsLoading(true);

    fetchPictures(query, page)
      .then(data => {
        const normalized = normalizedImages(data.hits);
        setImages(prevImages => [...prevImages, ...normalized]);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = image => {
    setShowModal(true);
    setSelectedImage(image);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage('');
  };

  return (
    <div className={css.App}>
      <Searchbar onSearch={handleSearch} />
      {error && <p>Error: {error}</p>}
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {!isLoading && images.length >= perPage && (
        <Button onClick={loadMoreImages} />
      )}
      {showModal && <Modal image={selectedImage} onClose={closeModal} />}
    </div>
  );
};