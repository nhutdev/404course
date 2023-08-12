const db = require("../models"); // gọi về model
const Note = db.note;
const User = db.user;

// hàm xử lý lấy ra danh sách note
const getNote = async (req, res) => {
  try {
    const note = await Note.findAll();
    res.status(200).json(note);
  } catch (error) {
    // trả thông báo lỗi về console
    console.log(error);
  }
};

// hàm xử lý thêm note
const addNote = async (req, res) => {
  try {
    const { title_note, content_note, id_user } = req.body;
    const exsitUser = await User.findByPk(id_user);
    const existNote = await Note.findOne({
      where: { title_note: title_note },
    });
    if (exsitUser) {
      if (existNote) {
        res.status(202).json({ message: "Ghi chú đã tồn tại" });
      } else {
        await Note.create({
          title_note: title_note,
          content_note: content_note,
          id_user: id_user,
        });
        res.status(200).json({ message: "Tạo ghi chú thành công" });
      }
    } else {
      res.status(202).json({ message: "Tạo ghi chú thất bại" });
    }
  } catch (error) {
    // trả thông báo lỗi về console
    console.log(error);
  }
};

// hàm xử lý update note
const updateNote = async (req, res) => {
  try {
    const id = req.params.id;
    const { title_note, content_note } = req.body;

    const existNote = await Note.findByPk(id);
    const exist = await Note.findOne({
      where: { title_note: title_note },
    });
    if (exist) {
      res.status(202).json({ message: "Tiêu đề ghi chú bị trùng lặp" });
    } else {
      if (existNote) {
        (existNote.title_note = title_note),
          (existNote.content_note = content_note);
        await existNote.save();
        res.status(200).json({ message: "cập nhật ghi chú thành công" });
      } else {
        res.status(202).json({ message: "Ghi chú không tồn tại" });
      }
    }
  } catch (error) {
    // trả thông báo lỗi về console
    console.log(error);
  }
};

// hàm xử lý delete note
const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    const existNote = await Note.findByPk(id);

    if (existNote) {
      await existNote.destroy();
      res.status(200).json({ message: "Xóa ghi chú thành công" });
    } else {
      res.status(202).json({ message: "Ghi chú không tồn tại" });
    }
  } catch (error) {
    // trả thông báo lỗi về console
    console.log(error);
  }
};

module.exports = {
  getNote,
  addNote,
  updateNote,
  deleteNote,
};
