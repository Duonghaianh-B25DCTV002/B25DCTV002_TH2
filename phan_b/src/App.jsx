import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Section from './components/Section';
import GenreFilter from './components/GenreFilter';
import BookList from './components/BookList';
import Footer from './components/Footer';
import { initialBooks } from './data/books';

function App() {
  const [books, setBooks] = useState(initialBooks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Tất cả');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('library_favorites_react');
    return saved ? JSON.parse(saved) : [];
  });
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // Extract unique genres
  const genres = useMemo(() => {
    return ['Tất cả', ...new Set(books.map(b => b.genre))];
  }, [books]);

  // Filter books
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchSearch = searchTerm === '' || book.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchGenre = selectedGenre === 'Tất cả' || book.genre === selectedGenre;
      return matchSearch && matchGenre;
    });
  }, [books, searchTerm, selectedGenre]);

  // Handle Theme
  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('library_favorites_react', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (bookId) => {
    setFavorites(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId) 
        : [...prev, bookId]
    );
  };

  const deleteBook = (bookId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa cuốn sách này?')) {
      setBooks(prev => prev.filter(b => b.id !== bookId));
    }
  };

  return (
    <>
      <Header 
        favoriteCount={favorites.length} 
        isDark={isDark} 
        onToggleTheme={() => setIsDark(!isDark)} 
      />
      
      <main className="main">
        <Section className="toolbar">
          <div className="toolbar__search">
            <input
              type="text"
              className="search__input"
              placeholder="Tìm kiếm theo tên sách..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <GenreFilter 
            genres={genres} 
            selectedGenre={selectedGenre} 
            onSelectGenre={setSelectedGenre} 
          />
        </Section>

        <div className="status">
          <p className="status__text">
            Đang hiển thị {filteredBooks.length} / {books.length} cuốn
          </p>
        </div>

        <Section>
          <BookList 
            books={filteredBooks} 
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onDelete={deleteBook}
          />
        </Section>
      </main>

      <Footer />
    </>
  );
}

export default App;
