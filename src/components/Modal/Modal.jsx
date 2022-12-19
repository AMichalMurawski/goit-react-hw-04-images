import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const ESCAPE_KEY = 27;

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    switch (e.keyCode) {
      case ESCAPE_KEY:
        this.props.modalClose();
        break;
      default:
        break;
    }
  };

  escapeClick = e => {
    if (e.target.tagName.toLowerCase() !== 'img') {
      this.props.modalClose();
    }
  };

  render() {
    const { src } = this.props;

    return (
      <div className={css.overlay} onClick={this.escapeClick}>
        <div className={css.modal}>
          <img className={css.image} src={src} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  modalClose: PropTypes.func.isRequired,
};
