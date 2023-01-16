import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export function ImageGallery({ images, ...props }) {
  return (
    <ul className={css.gallery}>
      {!!images &&
        images.map(image => {
          return (
            <ImageGalleryItem
              key={image.id}
              srcWeb={image.webformatURL}
              srcLarge={image.largeImageURL}
              alt={image.largeImageURL}
              modalOpen={src => props.modalOpen(src)}
            />
          );
        })}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  modalOpen: PropTypes.func.isRequired,
};
