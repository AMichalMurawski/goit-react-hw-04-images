import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const ESCAPE_KEY = 27;

export function Modal({ src, ...props }) {
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => { document.removeEventListener('keydown', handleKeyDown) }
  })

  function handleKeyDown(e) {
    switch (e.keyCode) {
      case ESCAPE_KEY:
        props.modalClose();
        break;
      default:
        break;
    }
  };

  function escapeClick(e) {
    if (e.target.tagName.toLowerCase() !== 'img') {
      props.modalClose();
    }
  };

    return (
      <div className={css.overlay} onClick={escapeClick}>
        <div className={css.modal}>
          <img className={css.image} src={src} alt="" />
        </div>
      </div>
    );
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  modalClose: PropTypes.func.isRequired,
};
