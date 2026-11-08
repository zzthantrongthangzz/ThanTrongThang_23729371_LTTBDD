# Câu trả lời bổ sung – Buổi 9

## 1. Giá trị dẫn xuất

`errors` và `valid` được tính trực tiếp từ state hiện tại nên luôn khớp với nội dung các ô nhập và giỏ hàng. Nếu lưu chúng bằng `useState`, phải đồng bộ lại ở mọi chỗ cập nhật tên, số điện thoại, địa chỉ hoặc giỏ hàng; bỏ sót một chỗ sẽ làm lỗi hiển thị sai hoặc nút bật/tắt không đúng.

## 2. Thứ tự gọi

Nếu gọi `clear()` trước `await createOrder(...)`, giỏ sẽ bị xóa ngay cả khi mất mạng và máy chủ chưa tạo đơn, khiến người dùng mất các sản phẩm đã chọn. Đặt `clear()` sau khi `createOrder` hoàn tất nghĩa là chỉ xóa giỏ khi máy chủ xác nhận tạo đơn thành công; nếu request lỗi, giỏ được giữ nguyên để thử lại.

## 3. PUT hay PATCH

`PUT /users/1` với `{ name, phone }` có thể thay toàn bộ user bằng object chỉ chứa các trường đó (cùng ID do json-server quản lý), làm mất email và các trường khác như password. Bài này dùng `PATCH` vì chỉ cần cập nhật một phần hồ sơ; service cũng loại `password` khỏi phản hồi trước khi đưa user vào store.

## 4. Cập nhật lạc quan

Nếu bỏ thao tác hoàn lại `read: false` khi `PATCH` lỗi, giao diện sẽ báo thông báo đã đọc nhưng máy chủ vẫn lưu là chưa đọc; tải lại màn hình thì trạng thái cũ xuất hiện lại. Cách cập nhật lạc quan phù hợp với thao tác nhẹ như thêm hoặc bỏ sách yêu thích. Không nên áp dụng cho thanh toán vì cần chờ máy chủ xác nhận trước khi báo đơn thành công hoặc xóa giỏ.

## 5. Bộ lọc trạng thái đơn hàng

Đã thêm state `statusFilter` với các lựa chọn Tất cả, Chờ xác nhận, Đang giao, Hoàn tất và Đã huỷ trong `src/screens/OrdersScreen.tsx`. `FlatList` nhận `filteredOrders`, được suy ra từ `orders` theo trạng thái đã chọn; nếu bộ lọc không có kết quả sẽ hiện thông báo riêng.

