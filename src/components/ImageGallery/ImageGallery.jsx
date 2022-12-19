import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  render() {
    const { children } = this.props;
    return <ul className={css.gallery}>{children}</ul>;
  }
}

ImageGallery.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
