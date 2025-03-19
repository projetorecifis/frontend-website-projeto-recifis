import { Router } from 'express'
import contentController from '../controllers/content.controller'
import { uploadAvatar } from '../config/multer';
import multer from 'multer';
import { count } from 'console';

const contentRouter = Router();

contentRouter.get('/news/getAll', contentController.getAllNews);
contentRouter.post('/news/create', multer(uploadAvatar.getConfig).single("image"), contentController.postNew);
contentRouter.put('/news/update/:id', multer(uploadAvatar.getConfig).single("image"), contentController.updateNew);
contentRouter.delete('/news/delete/:id', contentController.deleteNew);
// countentRouter.delete('/news/delete/:id', contentController.deleteNew);
// contentRouter.delete('/news/delete/:id', contentController.deleteNew);
// contentRouter.get('/news/getById/:id', contentController.getNewsById)


// contentRouter.post('/signIn', usuarioController.signIncontent)
// contentRouter.get('/auth/verify', verifyJWT, usuarioController.verifyAuth)

export default contentRouter;