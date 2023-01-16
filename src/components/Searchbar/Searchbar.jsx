import React from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { useState } from 'react';

export function Searchbar(props) {
  const [search, setSearch] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    props.searchImages(search);
  }

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <span className={css['button-label']}>Search</span>
        </button>
        <input
          className={css.input}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
          onChange={e => setSearch(e.currentTarget.value)}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  searchImages: PropTypes.func.isRequired,
};
