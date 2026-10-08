// ============================================
// favorite.js — Module yêu thích (localStorage)
// ============================================

const STORAGE_KEY = 'library_favorites';

/**
 * Đọc danh sách ID sách yêu thích từ localStorage
 * @returns {Set<number>} Set chứa các ID (số)
 */
export function getFavorites() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    const parsed = data ? JSON.parse(data) : [];
    // Đảm bảo ép kiểu id về number
    return new Set(parsed.map(id => Number(id)));
  } catch (error) {
    console.error('Lỗi đọc localStorage:', error);
    return new Set();
  }
}

/**
 * Lưu danh sách yêu thích vào localStorage
 * @param {Set<number>} favoritesSet - Set chứa các ID
 */
export function saveFavorites(favoritesSet) {
  try {
    const array = Array.from(favoritesSet);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(array));
  } catch (error) {
    console.error('Lỗi lưu localStorage:', error);
  }
}

/**
 * Toggle trạng thái yêu thích của 1 cuốn sách
 * @param {Set<number>} favoritesSet - Set hiện tại
 * @param {number} bookId - ID sách
 * @returns {boolean} Trạng thái mới (true = đã thêm, false = đã xóa)
 */
export function toggleFavorite(favoritesSet, bookId) {
  const id = Number(bookId);
  if (favoritesSet.has(id)) {
    favoritesSet.delete(id);
    saveFavorites(favoritesSet);
    return false; // Đã xóa khỏi yêu thích
  } else {
    favoritesSet.add(id);
    saveFavorites(favoritesSet);
    return true; // Đã thêm vào yêu thích
  }
}

/**
 * Cập nhật số lượng sách yêu thích lên Header
 * @param {Set<number>} favoritesSet 
 */
export function updateFavoriteBadge(favoritesSet) {
  const badge = document.getElementById('favorite-count');
  if (badge) {
    badge.textContent = favoritesSet.size;
  }
}
