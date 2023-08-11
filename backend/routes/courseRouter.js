const express = require("express");
const {getAll,addCourse,updateCourse,deleteCourse,
    getIndex,addIndex,updateIndex,deleteIndex,
    getContent,addContent,updateContent,deleteContent  } = require("../Controller/CourseController")
const routerCourse = express.Router();

routerCourse.get('/api/course/get',getAll)
routerCourse.post('/api/course/add',addCourse)
routerCourse.put('/api/course/update/:id',updateCourse)
routerCourse.delete('/api/course/delete/:id',deleteCourse)

routerCourse.get('/api/course/index/get/:id', getIndex)
routerCourse.post('/api/course/index/add/:id',addIndex)
routerCourse.put('/api/course/index/update/:id',updateIndex)
routerCourse.delete('/api/course/index/delete/:id',deleteIndex)

routerCourse.get('/api/course/index/content/get',getContent)
routerCourse.post('/api/course/index/content/add/:id',addContent)
routerCourse.put('/api/course/index/content/update/:id',updateContent)
routerCourse.delete('/api/course/index/content/delete/:id',deleteContent)

module.exports = {
    routerCourse
}