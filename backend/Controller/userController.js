const db = require("../models"); // gọi về model
const User = db.user; // gọi ra model user đặt tên là User
const bcrypt = require("bcryptjs"); // package bcrypt sử dụng trong việc mã hóa password
const fs = require("fs"); // package thao tác vs file 
const multer = require("multer"); // package sử dụng để thao tác upload file
// Được sử dụng để lưu trữ các tệp được tải lên trong thư mục uploads.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// Hàm sử dụng để thao tác với file = multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // giới hạn dung lượng file 5MB
  },
});

// Sử dụng hàm để xóa file khỏi thư mục upload
const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`File ${filePath} has been deleted`);
  });
}
// hàm lấy tất cả user 
const get_allUser = async (req, res) => {
  try {

  } catch (error) {
    // xuất lỗi ra trên console
    console.log(error)
  }
}

//hàm lấy user theo id
const get_byID = async (req, res) => {
  try {
    // hàm sẽ nhận 1 đối số id của user từ params của đường dẫn api
    const id = req.params.id;
  } catch (error) {
    // xuất lỗi ra trên console
    console.log(error)
  }
}

// Hàm update fullname và ảnh đại diện nhận vào 2 đối số là rep và res
const updateInfo = async (req, res) => {
  try {
    // hàm sẽ nhận 1 đối số id của user từ params của đường dẫn api
    const id = req.params.id;
  } catch (error) {
    // xuất lỗi ra trên console
    console.log(error)
  }
}

// Hàm update password vào 2 đối số là rep và res
const updatePassword = async (req, res) => {
  try {
    // hàm sẽ nhận 1 đối số id của user từ params của đường dẫn api
    const id = req.params.id;
  } catch (error) {
    // xuất lỗi ra trên console
    console.log(error)
  }
}

// Thực hiện việc xóa 1 user khỏi DB
const deleteUser = async (req, res) => {
  try {
    // hàm sẽ nhận 1 đối số id của user từ params của đường dẫn api
    const id = req.params.id;
  } catch (error) {
    // xuất lỗi ra trên console
    console.log(error)
  }
}
// GET danh sách follow 
const getFollow = async (req, res) => {
  try {

  } catch (error) {
    // xuất lỗi ra trên console
    console.log(error)
  }
}
// Thêm hoặc xóa 1 follow
const handleFollow = async (req, res) => {
  try {

  } catch (error) {
    // xuất lỗi ra trên console
    console.log(error)
  }
}


// Thực hiện việc thêm thông báo cho user
const createNotification = async (req, res) => {
  try {

  } catch (error) {
    // xuất lỗi ra trên console
    console.log(error)
  }
}

// Thực hiện xóa 1 thông báo
const deleteNotification = async (req, res) => {
  try {

  } catch (error) {
    // xuất lỗi ra trên console
    console.log(error)
  }
}
module.exports = {
  get_allUser,
  get_byID,
  updateInfo,
  updatePassword,
  deleteUser,
  getFollow,
  handleFollow,
  createNotification,
  deleteNotification
}
