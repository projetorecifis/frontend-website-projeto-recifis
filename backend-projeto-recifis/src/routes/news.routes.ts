import { Router } from 'express'
import NewsController from '../controllers/news.controller'
import { uploadAvatar } from '../config/multer';
import multer from 'multer';
import { count } from 'console';

const newsRouter = Router();

newsRouter.get('/getAll', NewsController.getAllNews);
newsRouter.post('/create', multer(uploadAvatar.getConfig).single("image"), NewsController.postNew);
newsRouter.put('/update/:id', multer(uploadAvatar.getConfig).single("image"), NewsController.updateNew);
newsRouter.delete('/delete/:id', NewsController.deleteNew);
// countentRouter.delete('/news/delete/:id', NewsController.deleteNew);
// newsRouter.delete('/news/delete/:id', NewsController.deleteNew);
// newsRouter.get('/news/getById/:id', NewsController.getNewsById)


// newsRouter.post('/signIn', usuarioController.signIncontent)
// newsRouter.get('/auth/verify', verifyJWT, usuarioController.verifyAuth)

export default newsRouter;