const express =require("express") ;
const {
    registerUser,
    updateAvatar,
    loginUser
} =require("../Controller/userController.js") ;
const routerUser = express.Router();
routerUser.post('/api/user/register', registerUser);
routerUser.put('/api/user/updateIMG/:id', updateAvatar);
routerUser.post('/api/user/login', loginUser);
module.exports = { 
    routerUser,
};
