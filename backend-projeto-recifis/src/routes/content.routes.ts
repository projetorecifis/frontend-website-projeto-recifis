import { Router } from 'express'
import contentController from '../controllers/content.controller'
import { uploadAvatar } from '../config/multer';
import multer from 'multer';

const contentRouter = Router()

contentRouter.get('/news', contentController.getAllNews)
contentRouter.post('/news/test', multer(uploadAvatar.getConfig).single("image"), contentController.postNew)
// contentRouter.post('/signIn', usuarioController.signIncontent)
// contentRouter.get('/auth/verify', verifyJWT, usuarioController.verifyAuth)

export default contentRouter