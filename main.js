// ============================================
// main.js — Entry point của Phần A
// ============================================

import { fetchBooks, addBookAPI, deleteBookAPI } from './api.js';
import { renderBooks, updateStatus, showLoading, hideLoading, showError, showToast } from './dom.js';
import { getGenres, filterBooks, initSearch, initGenreFilter, getSearchTerm, getSelectedGenre } from './search.js';
import { getFavorites, toggleFavorite, updateFavoriteBadge } from './favorite.js';
import { initForm, resetForm } from './form.js';

// State của ứng dụng
let booksData = [];
let favorites = new Set();

// Khởi tạo ứng dụng
async function initApp() {
  // 1. Theme toggle
  initTheme();

  // 2. Load favorites từ localStorage
  favorites = getFavorites();
  updateFavoriteBadge(favorites);

  // 3. Khởi tạo Event Delegation cho Book Grid
  initGridEvents();

  // 4. Khởi tạo Form Thêm Sách
  initForm(handleAddNewBook);

  // 5. Fetch dữ liệu
  await loadData();
}

/**
 * Tải dữ liệu từ API và render ban đầu
 */
async function loadData() {
  showLoading();
  try {
    booksData = await fetchBooks();
    
    // Tạo danh sách filter thể loại
    const genres = getGenres(booksData);
    initGenreFilter(genres, handleFilterChange);
    
    // Khởi tạo thanh search
    initSearch(handleFilterChange);
    
    // Render
    handleFilterChange();
    hideLoading();
  } catch (error) {
    showError(error.message);
    document.getElementById('retry-btn').onclick = loadData;
  }
}

/**
 * Xử lý khi có sự thay đổi ở thanh search hoặc filter thể loại
 */
function handleFilterChange() {
  const searchTerm = getSearchTerm();
  const selectedGenre = getSelectedGenre();
  
  const filteredBooks = filterBooks(booksData, searchTerm, selectedGenre);
  
  renderBooks(filteredBooks, favorites);
  updateStatus(filteredBooks.length, booksData.length);
}

/**
 * Khởi tạo Event Delegation cho danh sách sách (Yêu thích / Xóa)
 */
function initGridEvents() {
  const grid = document.getElementById('book-grid');
  
  grid.addEventListener('click', async (e) => {
    // Tìm button gần nhất được click
    const btn = e.target.closest('button');
    if (!btn) return;
    
    const bookId = Number(btn.dataset.id);
    const action = btn.dataset.action;
    
    if (action === 'favorite') {
      // Xử lý Yêu thích
      const isFav = toggleFavorite(favorites, bookId);
      
      // Update UI button
      btn.classList.toggle('active', isFav);
      btn.textContent = isFav ? 'Đã thích' : 'Yêu thích';
      
      // Update Badge
      updateFavoriteBadge(favorites);
      showToast(isFav ? 'Đã thêm vào mục yêu thích' : 'Đã bỏ yêu thích');
      
    } else if (action === 'delete') {
      // Xử lý Xóa
      if (confirm('Bạn có chắc chắn muốn xóa cuốn sách này?')) {
        try {
          // Xóa UI tạm thời để có cảm giác nhanh
          const card = btn.closest('.book-card');
          card.style.opacity = '0.5';
          
          await deleteBookAPI(bookId); // Gọi API DELETE (nếu có)
          
          // Xóa khỏi mảng data
          booksData = booksData.filter(b => b.id !== bookId);
          
          // Re-render
          handleFilterChange();
          showToast('Đã xóa sách thành công');
        } catch (err) {
          showToast('Lỗi khi xóa sách!');
          card.style.opacity = '1';
        }
      }
    }
  });
}

/**
 * Xử lý khi submit form thêm sách thành công
 * @param {Object} newBook - Sách mới (chưa có id)
 */
async function handleAddNewBook(newBook) {
  const submitBtn = document.getElementById('submit-btn');
  const originalText = submitBtn.innerHTML;
  
  try {
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Đang thêm...';
    
    // Gọi API POST
    const addedBook = await addBookAPI(newBook);
    
    // Thêm vào đầu mảng
    booksData.unshift(addedBook);
    
    // Update Filter (nếu có thể loại mới)
    const genres = getGenres(booksData);
    initGenreFilter(genres, handleFilterChange);
    
    // Re-render
    handleFilterChange();
    
    // Reset form & cuộn lên danh sách
    resetForm();
    showToast('Đã thêm sách mới thành công!');
    document.getElementById('toolbar').scrollIntoView({ behavior: 'smooth' });
    
  } catch (error) {
    showToast('Lỗi khi thêm sách!');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }
}

/**
 * Xử lý Theme Sáng/Tối
 */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  
  // Đọc theme từ localStorage (mặc định là light)
  let isDark = localStorage.getItem('theme') === 'dark';
  
  const updateThemeUI = () => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      toggleBtn.checked = true;
    } else {
      document.documentElement.removeAttribute('data-theme');
      toggleBtn.checked = false;
    }
  };
  
  updateThemeUI();
  
  toggleBtn.addEventListener('change', (e) => {
    isDark = e.target.checked;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeUI();
  });
}

// Chạy ứng dụng khi DOM tải xong
document.addEventListener('DOMContentLoaded', initApp);
