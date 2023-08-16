const express = require("express");

const {
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
  update_replyComment,
  getBlogByID
} = require("../Controller/BlogController");
const routerBlog = express.Router();

routerBlog.get("/api/blog/get", getBlog);
routerBlog.get("/api/blog/get/:id", getBlogByID);
routerBlog.post("/api/blog/add", addBlog);
routerBlog.put("/api/blog/update/:id", updateBlog);
routerBlog.delete("/api/blog/delete/:id", deleteBlog);

routerBlog.get("/api/blog/like/get", getlike);
routerBlog.post("/api/blog/like/handle", handlelike);

routerBlog.get("/api/blog/save/get", get_saveBlog);
routerBlog.post("/api/blog/save/handle", handle_saveBlog);

routerBlog.get("/api/blog/comment/get", getComment);
routerBlog.post("/api/blog/comment/add", addComment);
routerBlog.put("/api/blog/comment/update/:id", updateComment);
routerBlog.post("/api/blog/comment/delete/:id", deleteComment);

routerBlog.post("/api/blog/replycomment/add/:id", add_replyComment);
routerBlog.put("/api/blog/replycomment/update/:id", update_replyComment);
routerBlog.post("/api/blog/replycomment/delete/:id", delete_replyComment);

module.exports = {
  routerBlog,
};
