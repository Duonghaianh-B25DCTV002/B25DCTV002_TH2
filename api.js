// ============================================
// api.js — Module gọi API (fetch + async/await)
// ============================================

const API_URL = './data/books.json';
// Nếu dùng mockapi.io, thay bằng URL của bạn:
// const API_URL = 'https://xxxxxx.mockapi.io/api/v1/books';

/**
 * Tải danh sách sách từ API hoặc file JSON
 * @returns {Promise<Array>} Mảng các đối tượng sách
 */
export async function fetchBooks() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Lỗi tải dữ liệu: ${response.status} ${response.statusText}`);
  }
  const books = await response.json();
  return books;
}

/**
 * Thêm sách mới (POST lên mockapi hoặc trả về object mới)
 * @param {Object} book - Đối tượng sách cần thêm
 * @returns {Promise<Object>} Sách vừa được thêm (có id)
 */
export async function addBookAPI(book) {
  // Nếu dùng mockapi, gửi POST:
  // const response = await fetch(API_URL, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(book),
  // });
  // if (!response.ok) throw new Error('Không thể thêm sách');
  // return await response.json();

  // Khi dùng file JSON cục bộ, tạo id tạm:
  return { ...book, id: Date.now() };
}

/**
 * Xóa sách theo ID (DELETE lên mockapi)
 * @param {number|string} id - ID của sách cần xóa
 * @returns {Promise<void>}
 */
export async function deleteBookAPI(id) {
  // Nếu dùng mockapi:
  // const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  // if (!response.ok) throw new Error('Không thể xóa sách');
  // return await response.json();

  // Khi dùng file JSON cục bộ, không cần gọi API
  return Promise.resolve();
}
