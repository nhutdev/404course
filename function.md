# Learnerpage
+ Đăng nhập: đăng nhập vào trang chính "learnerpage"
+ Đăng ký: đăng ký tài khoản -> role "learner"
+ CRUD: Quên mật khẩu, cập nhập mật khẩu, đổi ảnh nền và fullname
+ BLOG: CRUD + tương tác (like,comment,save) 
+ Xem + lưu + Comment khóa học 
+ Nhận thông báo bài đăng - tổng - Xóa 
+ Tìm kiếm course - blog
+ Follow user để xem blog 
+ CRUD note

# Creatorpage
+ Đăng nhập: learnerpage -> chuyển qua creatorpage
+ CRUD course

# Adminpage:
+ Đăng nhập: chuyển adminpage
+ CRUD user.
+ CRUD tags + Duyệt tags mới.
+ D _ Duyệt course
+ D _ Duyệt blog
+ CRUD banner
+ Thống kê

=> 40 hàm được viết ở BE
=> FE không rõ 

# Kịch bản - sắp xếp controller
1. AuthController.js 
- Xử lý đăng nhập - đăng ký - Quên mật khẩu 
2. UserController 
- Update (fullname + avatar + mật khẩu) - GET(getall - getbyid) - deleteUser - NotificationUser - CRUD followuser
3. CourseController
- CRUD course - CRUD course_index - CRUD course_index_content - CommentCourse (comment - reply) - Notifications Course
4. BlogController
- CRUD blog - like - comment (comment - reply) - save 
5. SearchController
- searchUserbyemail - search course_blog
6. AdminController
- CRUD Tags - Duyện blogs - Duyệt tags - Duyệt course - CRUD banner - Các function Thống kê - CRUD role - user role
7. NoteController
- CRUD Note - CRUD Note_img

