import React from 'react';
import BookCard from './BookCard';

function BookList({ books, favorites, onToggleFavorite, onDelete }) {
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state__text">Không tìm thấy sách nào phù hợp.</p>
      </div>
    );
  }

  return (
    <div className="book-grid">
      {books.map((book, index) => (
        <div key={book.id} style={{ animationDelay: `${index * 0.05}s` }}>
          <BookCard 
            book={book} 
            isFavorite={favorites.includes(book.id)}
            onToggleFavorite={onToggleFavorite}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
}

export default BookList;
