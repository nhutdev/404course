const express =require("express") ;
const {
    searchUser,
    searchBlog,
    searchCourse
}=require("../Controller/searchController")
const routerSearch = express.Router();
routerSearch.post("/api/user/search",searchUser);
routerSearch.post("/api/blog/search",searchBlog)
routerSearch.post("/api/course/search",searchCourse)
module.exports = {
    routerSearch
}