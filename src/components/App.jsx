import { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { getImagesFromPixabay } from './services/api';

const IMAGES_PER_PAGE = 12;
const INITIAL_STATE = {
  searchText: '',
  totalHits: 0,
  pageNr: 1,
  maxPages: 1,
  images: [],
  isLoading: false,
  srcLarge: '',
};

export class App extends Component {
  state = {
    ...INITIAL_STATE,
  };

  searchImages = async (searchText, pageNr, imagesPerPage) => {
    this.setState({ isLoading: true });
    const response = await getImagesFromPixabay(
      searchText,
      pageNr,
      imagesPerPage
    );

    if (response.totalHits > 0) {
      let images = [];
      response.hits.forEach(image => {
        images.push({
          id: image.id,
          webformatURL: image.webformatURL,
          largeImageURL: image.largeImageURL,
        });
      });

      const prevImages = this.state.images;
      prevImages.forEach(prevImage => {
        images.forEach((image, index, array) => {
          if (prevImage.id === image.id) {
            console.log(image.id, index);
            array.splice(index, 1);
          }
        });
      });

      const maxPages = Math.ceil(response.totalHits / IMAGES_PER_PAGE);

      this.setState(prevState => {
        let newState = [];
        pageNr > 1
          ? (newState = [...this.state.images, ...images])
          : (newState = [...images]);
        return {
          searchText,
          totalHits: response.totalHits,
          pageNr,
          maxPages,
          images: newState,
          isLoading: false,
        };
      });
    } else {
      this.setState({ ...INITIAL_STATE });
    }
  };

  modalOpen = src => {
    this.setState({ srcLarge: src });
  };

  modalClose = () => {
    this.setState({ srcLarge: '' });
  };

  render() {
    const {
      searchText,
      images,
      pageNr,
      maxPages,
      totalHits,
      isLoading,
      srcLarge,
    } = this.state;

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
          searchImages={text => this.searchImages(text, 1, IMAGES_PER_PAGE)}
        />
        <ImageGallery>
          {images.map(image => {
            return (
              <ImageGalleryItem
                key={image.id}
                srcWeb={image.webformatURL}
                srcLarge={image.largeImageURL}
                alt={image.id}
                modalOpen={src => this.modalOpen(src)}
              />
            );
          })}
        </ImageGallery>
        {isLoading === true && <Loader />}
        {totalHits > 0 && pageNr < maxPages && (
          <Button
            pageNr={pageNr}
            onClick={nextPage =>
              this.searchImages(searchText, nextPage, IMAGES_PER_PAGE)
            }
          />
        )}
        {srcLarge.length > 0 && (
          <Modal src={srcLarge} modalClose={this.modalClose} />
        )}
      </div>
    );
  }
}
