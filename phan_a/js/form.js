// ============================================
// form.js — Module validate & xử lý form thêm sách
// ============================================

/**
 * Validate một input cụ thể
 * @param {HTMLInputElement|HTMLSelectElement} input - Phần tử input
 * @returns {boolean} true nếu hợp lệ, false nếu lỗi
 */
function validateInput(input) {
  const errorEl = document.getElementById(`error-${input.name}`);
  let isValid = true;
  let errorMessage = '';

  const value = input.value.trim();

  switch (input.name) {
    case 'title':
      if (value.length < 3) {
        isValid = false;
        errorMessage = 'Tên sách phải từ 3 ký tự trở lên.';
      }
      break;
    case 'author':
      if (value.length === 0) {
        isValid = false;
        errorMessage = 'Vui lòng nhập tên tác giả.';
      }
      break;
    case 'genre':
      if (value === '') {
        isValid = false;
        errorMessage = 'Vui lòng chọn thể loại.';
      }
      break;
    case 'genreOther':
      const genreSelect = document.getElementById('book-genre');
      if (genreSelect.value === 'other' && value === '') {
        isValid = false;
        errorMessage = 'Vui lòng nhập thể loại.';
      }
      break;
    case 'year':
      const year = Number(value);
      const currentYear = new Date().getFullYear();
      if (!value || isNaN(year) || year < 1900 || year > currentYear) {
        isValid = false;
        errorMessage = `Năm xuất bản phải từ 1900 đến ${currentYear}.`;
      }
      break;
  }

  // Cập nhật UI
  if (isValid) {
    input.classList.remove('invalid');
    input.classList.add('valid');
    errorEl.textContent = '';
  } else {
    input.classList.remove('valid');
    input.classList.add('invalid');
    errorEl.textContent = errorMessage;
  }

  return isValid;
}

/**
 * Khởi tạo form thêm sách
 * @param {Function} onSubmit - Callback được gọi khi form hợp lệ, truyền vào object sách
 */
export function initForm(onSubmit) {
  const form = document.getElementById('book-form');
  const inputs = form.querySelectorAll('.form-input');

  // Xử lý ẩn/hiện ô nhập thể loại khác
  const genreSelect = document.getElementById('book-genre');
  const genreOtherInput = document.getElementById('book-genre-other');
  
  genreSelect.addEventListener('change', () => {
    if (genreSelect.value === 'other') {
      genreOtherInput.style.display = 'block';
    } else {
      genreOtherInput.style.display = 'none';
      genreOtherInput.value = '';
      genreOtherInput.classList.remove('invalid', 'valid');
      document.getElementById('error-genreOther').textContent = '';
    }
  });

  // Validate khi gõ
  inputs.forEach(input => {
    input.addEventListener('input', () => validateInput(input));
    input.addEventListener('change', () => validateInput(input)); // Cho select
  });

  // Validate khi submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isFormValid = true;
    inputs.forEach(input => {
      if (!validateInput(input)) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      const finalGenre = form.genre.value === 'other' ? form.genreOther.value.trim() : form.genre.value;
      const newBook = {
        title: form.title.value.trim(),
        author: form.author.value.trim(),
        genre: finalGenre,
        year: Number(form.year.value)
      };

      onSubmit(newBook);
    }
  });
}

/**
 * Reset form về trạng thái ban đầu
 */
export function resetForm() {
  const form = document.getElementById('book-form');
  form.reset();
  form.querySelectorAll('.form-input').forEach(input => {
    input.classList.remove('valid', 'invalid');
  });
  form.querySelectorAll('.form-error').forEach(err => err.textContent = '');
  const genreOtherInput = document.getElementById('book-genre-other');
  if (genreOtherInput) {
    genreOtherInput.style.display = 'none';
  }
}
