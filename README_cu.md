# So Sánh Phần A (JavaScript Thuần) và Phần B (React)

Bài thực hành này giúp chúng ta thấy rõ sự khác biệt giữa việc thao tác DOM trực tiếp bằng JavaScript thuần và sử dụng thư viện/framework UI như React. Dưới đây là những điểm khác biệt chính:

## 1. Cách render giao diện (DOM Manipulation)

- **Phần A (JS Thuần):** Sử dụng các API của trình duyệt như `document.createElement`, `element.textContent`, và `element.appendChild` để tạo và đưa các phần tử HTML vào DOM. Code khá dài dòng và mang tính "mệnh lệnh" (imperative).
- **Phần B (React):** Sử dụng JSX để viết cú pháp giống HTML ngay trong JavaScript. React sử dụng Virtual DOM để tự động tính toán sự khác biệt và cập nhật DOM thực tế. Cách tiếp cận này mang tính "khai báo" (declarative), giúp code ngắn gọn và dễ hiểu hơn.

## 2. Quản lý trạng thái (State Management)

- **Phần A:** Trạng thái được lưu trong các biến toàn cục (như `booksData`, `favorites`, mảng kết quả tìm kiếm). Khi dữ liệu thay đổi, chúng ta phải gọi một hàm (như `renderBooks()`) để cập nhật lại giao diện một cách thủ công.
- **Phần B:** Sử dụng React Hooks, đặc biệt là `useState`. Khi state thay đổi bằng cách gọi hàm `set...`, React tự động biết cần phải re-render (render lại) các component phụ thuộc vào state đó mà không cần can thiệp thủ công.

## 3. Tổ chức mã nguồn (Code Organization)

- **Phần A:** Tổ chức theo chức năng thành các module JS riêng biệt: `api.js` (gọi dữ liệu), `dom.js` (vẽ giao diện), `search.js` (lọc dữ liệu), v.v. Tất cả được liên kết trong file `main.js`.
- **Phần B:** Tổ chức theo "Component" (Thành phần giao diện). Mỗi component (như `Header`, `BookCard`, `GenreFilter`) tự quản lý cấu trúc UI và logic hiển thị của riêng nó. Điều này giúp dễ dàng tái sử dụng (reusable) và chia nhỏ bài toán.

## 4. Xử lý sự kiện (Event Handling)

- **Phần A:** Phải sử dụng kỹ thuật **Event Delegation** (gắn 1 event listener vào thẻ cha `div#book-grid` thay vì từng nút bấm) để tối ưu hiệu suất và xử lý các phần tử được thêm vào DOM sau này một cách mượt mà.
- **Phần B:** Gắn trực tiếp các hàm xử lý sự kiện vào từng thẻ JSX (vd: `onClick={toggleFavorite}`). React tự động xử lý event delegation ngầm dưới dạng Synthetic Events, nên việc gắn event trở nên cực kỳ trực quan và dễ bảo trì.

## 5. Điểm chung (Common Points)

Dù sử dụng công nghệ nào, cả 2 phần đều tuân thủ một số nguyên tắc chung:
- **Ngôn ngữ cốt lõi:** Cả 2 đều phụ thuộc vào sức mạnh của JavaScript/ES6+ (các array methods như `map`, `filter`, các khái niệm như `Set`, `Promise`, `async/await`).
- **Logic nghiệp vụ:** Đều chung một luồng logic tính toán (ví dụ: thuật toán lọc sách kết hợp từ khóa và thể loại, logic xử lý mảng).
- **Trải nghiệm người dùng:** Mặc dù code bên dưới khác nhau, kết quả cuối cùng người dùng nhìn thấy đều là một giao diện hoàn chỉnh, tương tác trực tiếp trên trình duyệt (client-side).

## 6. Ưu điểm & Nhược điểm

### Phần A: JavaScript Thuần (Vanilla JS)
| Điểm mạnh (Ưu điểm) | Điểm yếu (Nhược điểm) |
| :--- | :--- |
| - **Không phụ thuộc:** Không cần cài đặt thư viện/công cụ thứ 3.<br>- **Tốc độ tải:** File siêu nhẹ, tốc độ khởi động cực nhanh.<br>- **Kiến thức cốt lõi:** Giúp nắm vững cách DOM và trình duyệt hoạt động. | - **Code dài dòng:** Thao tác DOM (`createElement`) mất rất nhiều dòng code.<br>- **Khó bảo trì:** Khi state (trạng thái) phức tạp, việc đồng bộ giữa Data và UI dễ gây bug (spaghetti code).<br>- **Khó tái sử dụng:** Khó gói gọn các đoạn UI thành những module độc lập. |

### Phần B: React
| Điểm mạnh (Ưu điểm) | Điểm yếu (Nhược điểm) |
| :--- | :--- |
| - **Gọn gàng (Declarative):** Chỉ cần đổi Data (State), React sẽ tự động cập nhật UI.<br>- **Tái sử dụng cao:** Chia nhỏ UI thành các Components độc lập.<br>- **Dễ scale:** Rất phù hợp để mở rộng thành các ứng dụng lớn và phức tạp. | - **Cồng kềnh:** Phải tải theo thư viện React (`react`, `react-dom`).<br>- **Setup phức tạp:** Bắt buộc phải có công cụ Build (như Vite, Webpack) để dịch JSX.<br>- **Đường cong học tập:** Cần thời gian hiểu về Hooks, Virtual DOM, Props, Re-render. |

## Tổng Kết

- **JavaScript Thuần** là công cụ hoàn hảo cho các dự án nhỏ, landing page hoặc các widget nhẹ nhàng. Nó mang lại hiệu suất thô cực tốt nhưng đòi hỏi sự cẩn thận khi cấu trúc code.
- **React** là giải pháp tối ưu khi ứng dụng bắt đầu có nhiều tương tác người dùng, form phức tạp và trạng thái thay đổi liên tục. Sự đánh đổi về thời gian setup và dung lượng thư viện hoàn toàn xứng đáng với hiệu quả bảo trì về sau.
