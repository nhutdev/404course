const db = require("../models"); // gọi về model
const User = db.user; // gọi ra model user đặt tên là User
const Blog = db.blog // gọi ra model blog
const Comment = db.comment_blog // gọi ra model comment blog
const Like = db.like_blog // gọi ra model like blog
const Save = db.save_blog // gọi ra model save blog

// hàm xử lý lấy ra danh sách blog
const getBlog = async (req, res) => {
    try {

    } catch (error) {
        // trả thông báo lỗi về console
        console.log(error)
    }
}

// hàm xử lý thêm blog
const addBlog = async (req, res) => {
    try {

    } catch (error) {
        // trả thông báo lỗi về console
        console.log(error)
    }
}

// hàm xử lý update blog
const updateBlog = async (req, res) => {
    try {

    } catch (error) {
        // trả thông báo lỗi về console
        console.log(error)
    }
}
const deleteBlog = async (req, res) => {
    try {

    } catch (error) {
        // trả thông báo lỗi về console
        console.log(error)
    }
}

// Thực hiện thêm hoặc hủy thích blog
const handlelike = async (req, res) => {
    try {

    } catch (error) {
        // trả thông báo lỗi về console
        console.log(error)
    }
}

// Thực hiện lấy like
const getlike = async (req, res) => {
    try {

    } catch (error) {
        // trả thông báo lỗi về console
        console.log(error)
    }
}

const get_saveBlog = async (req, res) => {
    try {

    } catch (error) {
        // trả thông báo lỗi về console
        console.log(error)
    }
}
// thực hiện việc thêm hoặc hủy theo dõi blog
const handle_saveBlog = async (req, res) => {
    try {

    } catch (error) {
        // trả thông báo lỗi về console
        console.log(error)
    }
}

// Thực hiện getComment
const getComment = async (req, res) => {
    try {

    } catch (error) {
        // trả thông báo lỗi về console
        console.log(error)
    }
}
// Thực hiện comment 
const addComment = async (req, res) => {
    try {

    } catch (error) {
        // trả thông báo lỗi về console
        console.log(error)
    }
}
// Thực hiện xóa comment
const deleteComment = async (req, res) => {
    try {
        // nhận vào id của  comment
        const id = req.params.id
    } catch (error) {
        // trả thông báo lỗi về console
        console.log(error)
    }
}
// Thực hiện cập nhập
const updateComment = async (req, res) => {
    try {
        // nhận vào id của  comment
        const id = req.params.id
    } catch (error) {
        // trả thông báo lỗi về console
        console.log(error)
    }
}
// Thực hiện reply comment
const add_replyComment = async (req, res) => {
    try {

    } catch (error) {
        // trả thông báo lỗi về console
        console.log(error)
    }
}
// Thực hiện sửa reply
const update_replyComment = async (req, res) => {
    try {
        // nhận vào id của reply comment
        const id = req.params.id
    } catch (error) {
        // trả thông báo lỗi về console
        console.log(error)
    }
}
// Thực hiện xóa reply
const delete_replyComment = async (req, res) => {
    try {
        // nhận vào id của reply comment
        const id = req.params.id
    } catch (error) {
        // trả thông báo lỗi về console
        console.log(error)
    }
}
module.exports = {
    getBlog,
    addBlog,
    updateBlog,
    deleteBlog,
    getlike,
    handlelike,
    get_saveBlog,
    handle_saveBlog,
    getComment,
    addComment,
    updateComment,
    deleteComment,
    add_replyComment,
    delete_replyComment,
    update_replyComment
}