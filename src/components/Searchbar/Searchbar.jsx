import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

const INITIAL_VALUE = {
  search: '',
};

export class Searchbar extends Component {
  state = {
    ...INITIAL_VALUE,
  };

  handleChange = e => {
    const search = e.currentTarget.value;
    this.setState({ search });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { search } = this.state;
    this.props.searchImages(search);
  };

  render() {
    const { search } = this.state;
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
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
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  searchImages: PropTypes.func.isRequired,
};
