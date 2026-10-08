import React from 'react';

function GenreFilter({ genres, selectedGenre, onSelectGenre }) {
  return (
    <div className="toolbar__filters">
      {genres.map(genre => (
        <button
          key={genre}
          type="button"
          className={`filter-btn ${selectedGenre === genre ? 'filter-btn--active' : ''}`}
          onClick={() => onSelectGenre(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}

export default GenreFilter;
