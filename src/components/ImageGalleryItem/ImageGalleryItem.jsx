import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  handleClick = () => {
    const { srcLarge } = this.props;
    this.props.modalOpen(srcLarge);
  };

  render() {
    const { srcWeb, alt } = this.props;
    return (
      <li className={css['gallery-item']}>
        <img
          className={css['item-image']}
          src={srcWeb}
          alt={alt}
          onClick={this.handleClick}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  srcLarge: PropTypes.string.isRequired,
  srcWeb: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
