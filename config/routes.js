const express = require('express')
const router = express.Router()
const uploadFile= require('../app/middlewares/uploadImage')
const userController= require('../app/controllers/usersController')
const userAuthentication=require('../app/middlewares/authentication')
const tasksController=require('../app/controllers/tasksController')

router.post('/users/register',userController.register) 
router.post('/users/login',userController.login)
router.get('/users/account',userAuthentication,userController.account)
router.delete('/users/logout',userAuthentication,userController.logout)

router.post('/task',userAuthentication,uploadFile.array('image',3),tasksController.createTask)
router.get('/task',userAuthentication,tasksController.list)
router.put('/task/:id',userAuthentication,uploadFile.array('image',3),tasksController.update)
router.delete('/task/:id',userAuthentication,tasksController.deleteTask)                            

router.post('/reset',userController.checkEmail)
router.get('/reset-pass/:token', userController.checkToken);
router.post('/new-password', userController.newPassword);

module.exports=router