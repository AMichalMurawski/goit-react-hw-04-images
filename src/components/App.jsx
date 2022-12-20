import React, { useState } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { getImagesFromPixabay } from './services/api';

const IMAGES_PER_PAGE = 12;

export function App() {
  const [searchText, setSearchText] = useState('')
  const [totalHits, setTotalHits] = useState(0)
  const [pageNr, setPageNr] = useState(1)
  const [maxPages, setMaxPages] = useState(1)
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [srcLarge, setSrcLarge] = useState('')

  async function searchImages (searchText, pageNr, imagesPerPage) {
    setIsLoading(true);
    const response = await getImagesFromPixabay(
      searchText,
      pageNr,
      imagesPerPage
    );

    if (response.totalHits > 0) {
      let newImages = [];
      response.hits.forEach(image => {
        newImages.push({
          id: image.id,
          webformatURL: image.webformatURL,
          largeImageURL: image.largeImageURL,
        });
      });

      if (pageNr === 1) { 
        setImages([...newImages])
      } else {
        images.forEach(image => {
          newImages.forEach((newImage, index, array) => {
            if (image.id === newImage.id) {
              console.log(newImage.id, index);
              array.splice(index, 1);
            }
          });
        });
        setImages([...images, ...newImages])
      }

      const maxPages = Math.ceil(response.totalHits / IMAGES_PER_PAGE);

      setSearchText(searchText);
      setTotalHits(response.totalHits);
      setPageNr(pageNr);
      setMaxPages(maxPages);
      setIsLoading(false);
    } else {
      resetState()
    }
    setIsLoading(false)
  };

  function resetState() {
    setSearchText('');
    setTotalHits(0);
    setPageNr(1);
    setMaxPages(1);
    setImages([]);
    setIsLoading(false);
    setSrcLarge('');
  }

    return (
      <div
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar
          searchImages={text => searchImages(text, 1, IMAGES_PER_PAGE)}
        />
        <ImageGallery>
          {images.map(image => {
            return (
              <ImageGalleryItem
                key={image.id}
                srcWeb={image.webformatURL}
                srcLarge={image.largeImageURL}
                alt={image.largeImageURL}
                modalOpen={src => setSrcLarge(src)}
              />
            );
          })}
        </ImageGallery>
        {isLoading === true && <Loader />}
        {totalHits > 0 && pageNr < maxPages && (
          <Button
            pageNr={pageNr}
            onClick={nextPage =>
              searchImages(searchText, nextPage, IMAGES_PER_PAGE)
            }
          />
        )}
        {srcLarge.length > 0 && (
          <Modal src={srcLarge} modalClose={() => setSrcLarge('')} />
        )}
      </div>
    );
  }

