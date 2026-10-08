// ============================================
// dom.js — Module render DOM (createElement + textContent)
// ============================================

/**
 * Tạo thẻ sách (book card) bằng createElement
 * @param {Object} book - Đối tượng sách
 * @param {boolean} isFavorite - Đã yêu thích hay chưa
 * @param {number} index - Thứ tự hiển thị (để stagger animation)
 * @returns {HTMLElement} Phần tử card
 */
export function createBookCard(book, isFavorite, index = 0) {
  // Card container
  const card = document.createElement('article');
  card.className = 'book-card';
  card.dataset.id = book.id;
  card.style.animationDelay = `${index * 0.05}s`;

  // Genre tag
  const genreTag = document.createElement('span');
  genreTag.className = 'book-card__genre-tag';
  genreTag.dataset.genre = book.genre;
  genreTag.textContent = book.genre;

  // Title
  const title = document.createElement('h3');
  title.className = 'book-card__title';
  title.textContent = book.title;

  // Author
  const author = document.createElement('p');
  author.className = 'book-card__author';
  author.textContent = book.author;

  // Year
  const year = document.createElement('p');
  year.className = 'book-card__year';
  year.textContent = `Năm ${book.year}`;

  // Actions
  const actions = document.createElement('div');
  actions.className = 'book-card__actions';

  // Nút yêu thích
  const favBtn = document.createElement('button');
  favBtn.className = `book-card__btn book-card__btn--fav${isFavorite ? ' active' : ''}`;
  favBtn.dataset.action = 'favorite';
  favBtn.dataset.id = book.id;
  favBtn.textContent = isFavorite ? 'Đã thích' : 'Yêu thích';

  // Nút xóa
  const delBtn = document.createElement('button');
  delBtn.className = 'book-card__btn book-card__btn--del';
  delBtn.dataset.action = 'delete';
  delBtn.dataset.id = book.id;
  delBtn.textContent = 'Xóa';

  actions.appendChild(favBtn);
  actions.appendChild(delBtn);

  card.appendChild(genreTag);
  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(year);
  card.appendChild(actions);

  return card;
}

/**
 * Render toàn bộ danh sách sách vào grid
 * @param {Array} books - Mảng sách cần hiển thị
 * @param {Set} favorites - Set các ID sách yêu thích
 */
export function renderBooks(books, favorites) {
  const grid = document.getElementById('book-grid');
  grid.innerHTML = '';

    if (books.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';

    const text = document.createElement('p');
    text.className = 'empty-state__text';
    text.textContent = 'Không tìm thấy sách nào phù hợp.';

    empty.appendChild(text);
    grid.appendChild(empty);
    return;
  }

  books.forEach((book, index) => {
    const isFavorite = favorites.has(book.id);
    const card = createBookCard(book, isFavorite, index);
    grid.appendChild(card);
  });
}

/**
 * Cập nhật dòng trạng thái "Đang hiển thị x / y cuốn"
 * @param {number} shown - Số sách đang hiển thị
 * @param {number} total - Tổng số sách
 */
export function updateStatus(shown, total) {
  const statusText = document.getElementById('status-text');
  statusText.textContent = `Đang hiển thị ${shown} / ${total} cuốn`;
}

/**
 * Hiện loading spinner
 */
export function showLoading() {
  document.getElementById('loading').hidden = false;
  document.getElementById('book-grid').style.display = 'none';
  document.getElementById('error').hidden = true;
}

/**
 * Ẩn loading spinner
 */
export function hideLoading() {
  document.getElementById('loading').hidden = true;
  document.getElementById('book-grid').style.display = '';
}

/**
 * Hiện thông báo lỗi
 * @param {string} message - Nội dung lỗi
 */
export function showError(message) {
  hideLoading();
  document.getElementById('book-grid').style.display = 'none';
  const errorEl = document.getElementById('error');
  errorEl.hidden = false;
  document.getElementById('error-text').textContent = message;
}

/**
 * Ẩn thông báo lỗi
 */
export function hideError() {
  document.getElementById('error').hidden = true;
}

/**
 * Hiện toast notification
 * @param {string} message - Nội dung thông báo
 */
export function showToast(message) {
  // Xóa toast cũ nếu có
  const oldToast = document.querySelector('.toast');
  if (oldToast) oldToast.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  // Tự xóa sau 3 giây
  setTimeout(() => toast.remove(), 3000);
}
