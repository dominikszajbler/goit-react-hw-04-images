import React, { useState } from 'react';
import PropTypes from 'prop-types';

import css from './Searchbar.module.css';

export const Searchbar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchForm__button}>
          <span className={css.SearchForm__button__label}>Search</span>
        </button>
        <input
          className={css.SearchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images..."
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};