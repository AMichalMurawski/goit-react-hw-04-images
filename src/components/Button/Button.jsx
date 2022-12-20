import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

export function Button ({pageNr, ...props}) {
    return (
      <button className={css.button} type="button" onClick={e => props.onClick(pageNr+1)}>
        Load more
      </button>
    );
  }


Button.propTypes = {
  pageNr: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
