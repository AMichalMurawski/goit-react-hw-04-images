import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem({ srcWeb, alt, srcLarge, ...props }) {
  return (
    <li className={css['gallery-item']}>
      <img
        className={css['item-image']}
        src={srcWeb}
        alt={alt}
        onClick={e => props.modalOpen(srcLarge)}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  srcLarge: PropTypes.string.isRequired,
  srcWeb: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  modalOpen: PropTypes.func.isRequired,
};
