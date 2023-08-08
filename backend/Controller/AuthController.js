const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("../models");
const multer = require("multer");
const User = db.user;
const fs = require("fs");
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // giới hạn dung lượng file 100MB
  },
});

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`File ${filePath} has been deleted`);
  });
}

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const exitsEmail = await User.findOne({ where: { email } });
    const exitsUsername = await User.findOne({ where: { username } });

    if (exitsEmail) {
      res.status(202).json({ message: "Địa chỉ email bị trùng lập" });
    }
    else if (exitsUsername) {
      res.status(202).json({ message: "Username bị trùng lại" });
    }
    else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await User.create({
        username: username,
        email: email,
        password: hashedPassword,
        role: 'learner'
      })
      if (user) {
        res.status(200).json({ message: "Đăng ký thành công" });
      }
    }

  } catch (error) {
    console.log(error)
  }
}
const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Tìm kiếm khách hàng với email cung cấp
    const user = await User.findOne({
      where: {
        email,
      },
    });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user) {
      return res.status(202).json({
        message: "Tài khoản hoặc mật khẩu không đúng",
      });
    }

    // So sánh mật khẩu được cung cấp với mật khẩu đã được mã hóa
    else if (!isMatch) {
      return res.status(202).json({
        message: "Tài khoản hoặc mật khẩu không đúng",
      });
    }
    else {
      // Tạo JWT
      const token = jwt.sign(
        {
          userId: user.id,
        },
        JWT_SECRET,
        {
          expiresIn: JWT_EXPIRES_IN,
        }
      );
      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        createdAt: user.createdAt,
        token,
      });
    }

    // Trả về JWT và thông tin người dùng

  } catch (error) {
    console.log(error);
    res.status(202).json({
      message: "Đăng nhập thất sssss",
    });
  }
};
const updateAvatar = async (req, res) => {
  const id = req.params.id
  const getUser = await User.findByPk(id);
  try {
    try {
      upload.single("avatar")(req, res, async function (err) {
        const id = req.params.id;
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ message: err.message });
        } else if (err) {
          return res.status(400).json({ message: err.message });
        }
        const img = await User.findByPk(id);
        // Kiểm tra nếu có file ảnh mới được chọn
        if (req.file) {
          const imageUrl = `${req.protocol}://${req.get("host")}/${req.file.filename
            }`;
          const image_name = req.files[i].filename
          if (getUser.avatar != null) {
            const imagePath = `./uploads/${getUser.avatar_name}`;
            deleteFile(imagePath);
            img.avatar = imageUrl;
            img.avatar_name = image_name
            await img.save();
          }
          else {
            img.avatar = imageUrl;
            img.avatar_name = image_name
            await img.save();
          }
        }
        return res.status(200).json({ message: 'Cập nhập thành công' });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Lỗi server" });
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  register,
  login
};