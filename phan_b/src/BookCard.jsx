import React from 'react';

function BookCard({ book, isFavorite, onToggleFavorite, onDelete }) {
  return (
    <article className="book-card">
      <span className="book-card__genre-tag" data-genre={book.genre}>
        {book.genre}
      </span>
      <h3 className="book-card__title">{book.title}</h3>
      <p className="book-card__author">{book.author}</p>
      <p className="book-card__year">Năm {book.year}</p>
      
      <div className="book-card__actions">
        <button 
          className={`book-card__btn book-card__btn--fav ${isFavorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(book.id)}
        >
          {isFavorite ? 'Đã thích' : 'Yêu thích'}
        </button>
        <button 
          className="book-card__btn book-card__btn--del"
          onClick={() => onDelete(book.id)}
        >
          Xóa
        </button>
      </div>
    </article>
  );
}

export default BookCard;
