import React from 'react';

function Header({ favoriteCount, isDark, onToggleTheme }) {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__brand">
          <h1 className="header__title">Thư Viện Sách</h1>
        </div>
        <div className="header__actions">
          <label className="theme-switch" aria-label="Chuyển chế độ sáng/tối">
            <input 
              type="checkbox" 
              checked={isDark}
              onChange={onToggleTheme} 
            />
            <span className="slider"></span>
          </label>
          <div className="header__badge">
            Yêu thích: <span className="badge__count">{favoriteCount}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
