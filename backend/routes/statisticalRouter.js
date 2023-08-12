const express = require("express");
const { 
    chartCoursePoint,
    chartBlog,
    chartBlogByUser,
    chartCourseBySave,
    chartUserByRole
} = require("../Controller/statisticalController")
const routerStatistcal = express.Router();
routerStatistcal.get('/api/chart/coursepoint',chartCoursePoint)
module.exports = {
    routerStatistcal
}
