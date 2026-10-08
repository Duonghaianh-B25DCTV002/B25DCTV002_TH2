// ============================================
// search.js — Module tìm kiếm & lọc thể loại
// ============================================

/**
 * Trích xuất danh sách thể loại duy nhất bằng Set
 * @param {Array} books - Mảng sách
 * @returns {Array<string>} Danh sách thể loại (bao gồm "Tất cả")
 */
export function getGenres(books) {
  const genreSet = new Set(books.map(book => book.genre));
  return ['Tất cả', ...genreSet];
}

/**
 * Lọc sách theo từ khóa tìm kiếm VÀ thể loại
 * @param {Array} books - Mảng sách gốc
 * @param {string} searchTerm - Từ khóa tìm kiếm
 * @param {string} genre - Thể loại được chọn ("Tất cả" = không lọc)
 * @returns {Array} Mảng sách đã lọc
 */
export function filterBooks(books, searchTerm, genre) {
  const term = searchTerm.toLowerCase().trim();

  return books.filter(book => {
    // Điều kiện 1: tìm kiếm theo tên (case-insensitive)
    const matchesSearch = term === '' || book.title.toLowerCase().includes(term);

    // Điều kiện 2: lọc theo thể loại
    const matchesGenre = genre === 'Tất cả' || book.genre === genre;

    // Kết hợp cả 2 điều kiện
    return matchesSearch && matchesGenre;
  });
}

/**
 * Khởi tạo ô tìm kiếm — lắng nghe sự kiện input realtime
 * @param {Function} onFilter - Callback gọi khi có thay đổi bộ lọc
 */
export function initSearch(onFilter) {
  const searchInput = document.getElementById('search-input');

  searchInput.addEventListener('input', () => {
    onFilter();
  });
}

/**
 * Tạo các nút lọc thể loại từ danh sách genres
 * @param {Array<string>} genres - Danh sách thể loại
 * @param {Function} onFilter - Callback gọi khi chọn thể loại
 * @returns {string} Thể loại đang chọn ban đầu ("Tất cả")
 */
export function initGenreFilter(genres, onFilter) {
  const container = document.getElementById('genre-filters');
  container.innerHTML = '';

  genres.forEach(genre => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (genre === 'Tất cả' ? ' filter-btn--active' : '');
    btn.dataset.genre = genre;
    btn.textContent = genre;
    btn.type = 'button';

    btn.addEventListener('click', () => {
      // Cập nhật active state
      container.querySelectorAll('.filter-btn').forEach(b =>
        b.classList.remove('filter-btn--active')
      );
      btn.classList.add('filter-btn--active');

      onFilter();
    });

    container.appendChild(btn);
  });

  return 'Tất cả';
}

/**
 * Lấy giá trị tìm kiếm hiện tại
 * @returns {string}
 */
export function getSearchTerm() {
  return document.getElementById('search-input').value;
}

/**
 * Lấy thể loại đang được chọn
 * @returns {string}
 */
export function getSelectedGenre() {
  const activeBtn = document.querySelector('.filter-btn--active');
  return activeBtn ? activeBtn.dataset.genre : 'Tất cả';
}
