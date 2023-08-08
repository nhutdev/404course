const express =require("express") ;
const {
  get_allUser,
  get_byID,
  updateInfo,
  updatePassword,
  deleteUser,
  getFollow,
  handleFollow,
  createNotification,
  deleteNotification
} =require("../Controller/userController.js") ;
const routerUser = express.Router();
routerUser.get('/api/user/get',get_allUser);
routerUser.post('/api/user/getbyid/:id',get_byID);
routerUser.put('/api/user/updateInfo/:id',updateInfo);
routerUser.put('/api/user/updatePassword/:id',updatePassword);
routerUser.delete('/api/user/delete',deleteUser)
routerUser.get('/api/follow/get',getFollow);
routerUser.post('/api/follow/handle',handleFollow);
routerUser.post('/api/user/noti/create',createNotification);
routerUser.delete('/api/user/noti/delete',deleteNotification);

module.exports = { 
    routerUser,
};
