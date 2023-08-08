const db = require("../models"); // gọi về model
const User = db.user; // gọi ra model user đặt tên là User
const Blog = db.blog; // gọi ra model blog
const Course = db.course // gọi ra model course
// Tạo ra một cơ chế tìm kiếm có sử dụng thuật toán phù họp
// Hàm search blog
const searchBlog = async (req, res) => {
    try {

    } catch (error) {
        // trả thông báo lỗi về console
        console.log(error)
    }
}

// Hàm search Course
const searchCourse = async (req, res) => {
    try {

    } catch (error) {
        // trả thông báo lỗi về console
        console.log(error)
    }
}

// Hàm tìm user theo email

const searchUser = async (req, res) => {
    try {

    } catch (error) {
        // trả thông báo lỗi về console
        console.log(error)
    }
}

module.exports = {
    searchUser,
    searchBlog,
    searchCourse
}