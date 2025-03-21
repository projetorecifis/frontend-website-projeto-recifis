import { Router } from 'express'
import LecturesController from '../controllers/lectures.controller'
import { uploadAvatar } from '../config/multer';
import multer from 'multer';
import { count } from 'console';

const lecturesRouter = Router();

lecturesRouter.get('/getAll', LecturesController.getAllLectures);
lecturesRouter.post('/create', multer(uploadAvatar.getConfig).single("image"), LecturesController.postLecture);
lecturesRouter.put('/update/:id', multer(uploadAvatar.getConfig).single("image"), LecturesController.updateLecture);
lecturesRouter.delete('/delete/:id', LecturesController.deleteLecture);
// countentRouter.delete('/lectures/delete/:id', LecturesController.deleteLecture);
// lecturesRouter.delete('/lectures/delete/:id', LecturesController.deleteLecture);
// lecturesRouter.get('/lectures/getById/:id', LecturesController.getLecturesById)


// lecturesRouter.post('/signIn', usuarioController.signIncontent)
// lecturesRouter.get('/auth/verify', verifyJWT, usuarioController.verifyAuth)

export default lecturesRouter;