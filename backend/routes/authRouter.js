const express = require("express");
const { register,login } = require("../Controller/AuthController")
const routerAuth = express.Router();

routerAuth.post("/api/auth/login",register);
routerAuth.post("/api/auth/register", login)
module.exports = {
    routerAuth
}