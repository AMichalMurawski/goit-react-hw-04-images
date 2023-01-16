import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

export function Button({ page, ...props }) {
  return (
    <button
      className={css.button}
      type="button"
      onClick={e => props.onClick(page + 1)}
    >
      Load more
    </button>
  );
}

Button.propTypes = {
  page: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
