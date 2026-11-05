# Câu hỏi bổ sung

## 1. Cờ `ready` trong `useAutoPersist`

Khi mở app, store khởi tạo giỏ hàng rỗng trong lúc `usePersistence` đang đọc dữ liệu cũ từ AsyncStorage.

1. Ở lần render đầu, `ready` là `false`, `cartItems` là `[]`. Effect của `useAutoPersist` chạy nhưng không ghi vì chưa sẵn sàng.
2. Sau khi AsyncStorage đọc xong, `hydrateCart(savedCart)` nạp giỏ hàng cũ vào store; `ready` được đặt thành `true`.
3. Component render lại với giỏ hàng đã khôi phục. Lúc này effect mới ghi giá trị đã khôi phục vào AsyncStorage.

Nếu bỏ điều kiện `ready`, effect đầu tiên có thể ghi `[]` đè lên dữ liệu cũ trước khi lần đọc hoàn tất. Khi đó lần mở app tiếp theo không còn giỏ hàng đã lưu.

```tsx
useEffect(() => {
  if (ready) void saveJSON(key, value);
}, [key, value, ready]);
```

## 2. Token giả và kiểm tra mật khẩu

Hai điểm không an toàn trong mô hình minh họa:

- Mật khẩu mẫu được lưu trong `db.json` và app tải dữ liệu đó về để tự so sánh. Dữ liệu phía client có thể bị đọc hoặc sửa, nên không thể tin app là nơi xác thực.
- Token được tạo giả ngay trong app, không do hệ thống xác thực cấp và không có chữ ký đáng tin cậy. Người dùng có thể sửa app để tự tạo token hoặc giả mạo phiên.

Trong hệ thống thật, máy chủ nhận thông tin đăng nhập, kiểm tra mật khẩu đã băm an toàn và tự cấp token có thời hạn. Trên thiết bị, nên lưu token trong vùng lưu trữ bảo mật của hệ điều hành như SecureStore (Keychain trên iOS, Keystore trên Android), thay cho AsyncStorage vốn không mã hóa dữ liệu nhạy cảm.

## 3. Hai effect trong `CartItemRow`

Effect thứ nhất chờ số lượng đã debounce rồi cập nhật store. Effect thứ hai nhận thay đổi số lượng từ store và đồng bộ lại state cục bộ `qty`.

Nếu xóa effect đồng bộ, số hiển thị bị lệch khi store đổi từ bên ngoài component. Ví dụ khi mở lại app, dữ liệu khôi phục từ AsyncStorage cập nhật `item.quantity` nhưng `qty` vẫn giữ giá trị khởi tạo cũ. Tương tự, một cập nhật cùng sản phẩm từ nơi khác trong giao diện cũng không cập nhật nút số lượng của hàng đang hiển thị.

```tsx
useEffect(() => setQty(item.quantity), [item.quantity]);
```

## 4. Một nguồn state cho yêu thích

Nếu mỗi `HeartButton` dùng `useState` riêng, nút tim trên lưới và nút tim trong trang chi tiết là hai state độc lập. Bấm tim ở lưới chỉ đổi nút đó; mở chi tiết, nút kia vẫn có thể hiện trạng thái cũ.

Store giữ danh sách ID yêu thích chung. Mỗi nút đọc trạng thái bằng `isFavorite(bookId)` và gửi thao tác đổi bằng `toggle(bookId)`. Store cập nhật làm mọi component đang đọc ID đó render lại, nên hai vị trí luôn đồng bộ.

## 5. Hiện hoặc ẩn mật khẩu

`showPassword` điều khiển thuộc tính `secureTextEntry`. Nút 👁 bên phải ô nhập đảo state khi được bấm.

```tsx
const [showPassword, setShowPassword] = useState(false);

<FormField
  label="Mật khẩu"
  value={password}
  onChangeText={setPassword}
  secureTextEntry={!showPassword}
  rightAccessory={(
    <Pressable onPress={() => setShowPassword((shown) => !shown)}>
      <Text>👁</Text>
    </Pressable>
  )}
/>
```
