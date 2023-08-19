const db = require("../models");
const Course = db.course;
const User = db.user;
const Index = db.index_course;
const Index_Content = db.content_index_course;
const ITEMS_PER_PAGE = 5; // Số lượng mục trên mỗi trang

const getAll = async (req, res) => {
  try {
    const status = req.query.status;
    const page = parseInt(req.query.page) || 1; // Trang hiện tại từ query string, mặc định là trang 1

    const offset = (page - 1) * ITEMS_PER_PAGE;

    const courses = await Course.findAndCountAll({
      attributes: [
        "id",
        "title_course",
        "description_course",
        "img_course",
        "status",
        "createdAt",
        "updatedAt",
      ],
      where: { status: status },
      order: [["id", "DESC"]],
      include: [
        { model: User, attributes: ["id", "fullname"] },
        {
          model: Index,
          attributes: ["id", "title_index", "description_index"],
          include: {
            model: Index_Content,
            attributes: [
              "id",
              "title_content",
              "description_content",
              "type",
              "link_video",
            ],
          },
        },
      ],
      offset: offset,
      limit: ITEMS_PER_PAGE,
    });

    const totalItems = courses.count;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    res.json({
      courses: courses.rows,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    console.log(error);
  }
};

const addCourse = async (req, res) => {
  try {
    const { id_user, title_course, description_course, img_course } = req.body;
    const exitst = await User.findByPk(id_user);
    if (exitst) {
      const course = await Course.create({
        id_user: id_user,
        title_course: title_course,
        description_course: description_course,
        img_course: img_course,
        status: false,
      });
      if (course) {
        res.status(200).json({ message: "Thêm thành công khóa học", course });
      }
    } else {
      res.status(202).json({ message: "Không tồn tại user này" });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const { title_course, description_course, img_course } = req.body;
    const exits = await Course.findByPk(id);
    if (exits) {
      await exits.update({ title_course, description_course, img_course });
    } else {
      res.status(202).json({ message: "Không tồn tại khóa học này" });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const exits = await Course.findByPk(id);
    const exitsIndex = await Index.findOne({ where: { id_course: id } });
    if (exitsIndex) {
      res.status(202).json({ message: "Không xóa được khóa học này" });
    } else if (exits) {
      await exits.destroy();
      res.status(200).json({ message: "Xóa thành công khóa học" });
    } else {
      res.status(202).json({ message: "Không tồn tại khóa học này" });
    }
  } catch (error) {
    console.log(error);
  }
};

// Chỉ mục crud

const getIndex = async (req, res) => {
  try {
    const id = req.params.id;
    const exits = await Course.findByPk(id);
    if (exits) {
      const get = await Index.findAll({ where: { id_course: id } });
      res.json(get);
    } else {
      res.status(202).json({ message: "Không tồn tại chỉ mục này" });
    }
  } catch (error) {
    console.log(error);
  }
};

const addIndex = async (req, res) => {
  try {
    const id = req.params.id;
    const { title_index, description_index } = req.body;
    const exits = await Course.findByPk(id);
    if (exits) {
      const index = await Index.create({
        id_course: id,
        title_index: title_index,
        description_index: description_index,
      });
      res.status(200).json({ message: "Thêm thành công chỉ mục", index });
    } else {
      res.status(202).json({ message: "Không tồn tại chỉ mục này" });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateIndex = async (req, res) => {
  try {
    const id = req.params.id;
    const { title_index, description_index } = req.body;
    const exits = await Index.findByPk(id);
    if (exits) {
      await exits.update({
        title_index: title_index,
        description_index: d,
        description_index,
      });
      res.status(200).json({ message: "Cập nhập thành công chỉ mục" });
    } else {
      res.status(202).json({ message: "Không tồn tại chỉ mục này" });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteIndex = async (req, res) => {
  try {
    const id = req.params.id;
    const exitsIndex = await Index.findByPk(id);
    const exitsContent = await Index_Content.findOne({
      where: { id_index: id },
    });
    if (exitsContent) {
      res.status(202).json({ message: "Không xóa được nội dung chỉ mục này" });
    } else if (exitsIndex) {
      await exitsIndex.destroy();
      res.status(200).json({ message: "Xóa thành công chỉ mục" });
    } else {
      res.status(202).json({ message: "Không tồn tại chỉ mục này" });
    }
  } catch (error) {
    console.log(error);
  }
};

//content crud
const getContent = async (req, res) => {
  try {
    const get = await Index_Content.findAll();
    res.json(get);
  } catch (error) {
    console.log(error);
  }
};

const addContent = async (req, res) => {
  try {
    const id = req.params.id;
    const { title_content, description_content, type, link_video } = req.body;
    const exits = await Index.findByPk(id);
    if (exits) {
      await Index_Content.create({
        id_index: id,
        title_content: title_content,
        description_content: description_content,
        type: type,
        link_video: link_video,
      });
      res.status(200).json({ message: "Thêm thành công nội dung" });
    } else {
      res.status(202).json({ message: "Không tồn tại chỉ mục này" });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateContent = async (req, res) => {
  try {
    const id = req.params.id;
    const { title_content, description_content, type, link_video } = req.body;
    const exits = await Index_Content.findByPk(id);
    if (exits) {
      await Index_Content.create({
        id_index: id,
        title_content: title_content,
        description_content: description_content,
        type: type,
        link_video: link_video,
      });
      res.status(200).json({ message: "Cập nhập thành công nội dung" });
    } else {
      res.status(202).json({ message: "Không tồn tại nội dung này" });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteContent = async (req, res) => {
  try {
    const id = req.params.id;
    const exits = await Index_Content.findByPk(id);
    if (exits) {
      exits.destroy();
      res.status(200).json({ message: "Xóa thành công nội dung" });
    } else {
      res.status(202).json({ message: "Không tồn tại nội dung này" });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getAll,
  addCourse,
  updateCourse,
  deleteCourse,
  getIndex,
  addIndex,
  updateIndex,
  deleteIndex,
  getContent,
  addContent,
  updateContent,
  deleteContent,
};
