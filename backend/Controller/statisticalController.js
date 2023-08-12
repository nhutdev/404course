const db = require("../models"); // gọi về model

const Blog = db.blog; // gọi ra model blog
const Tag = db.tag; // gọi ra model tag
const Comment = db.comment_blog; // gọi ra model comment blog
const Like = db.like_blog; // gọi ra model like blog
const Save = db.save_blog; // gọi ra model save blog

const Course = db.course
const Index = db.index_course
const Index_Content = db.content_index_course
const Question = db.question_course

const User = db.user; // gọi ra model user đặt tên là User
const Role = db.role; // gọi ra model role đặt tên là Role
const User_role = db.user_role; // gọi ra model user_role đặt tên là User_role

const sequelize = require('sequelize');
// Thống kê điểm tương tác -> comment
const chartCoursePoint = async (req,res)=>{
    try {
         const get = await Question.findAll({
            attributes:['id_course', [sequelize.fn('COUNT', 'Course.id'), 'point']],
            include:{
                model:Course,
                attributes:['title_course']
            },
            group:['id_course']
         }) ;
         res.json(get)

    } catch (error) {
        console.log(error)
    }
}

// Thống kê save_course
const chartCourseBySave = async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
    }
}

// Thông kê lượt tương tác của blog
const chartBlog = async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
    }
}

// thong ke blog tung user
const chartBlogByUser = async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
    }
}

const chartUserByRole = async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    chartCoursePoint,
    chartBlog,
    chartBlogByUser,
    chartCourseBySave,
    chartUserByRole
}
