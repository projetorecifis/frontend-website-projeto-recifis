import { Router } from 'express'
import UserController from '../controllers/user.controller'
// import verifyJWT from '../middleware/user.auth'

const userRouter = Router();

// userRouter.get('/teste', UserController.getTeste)
userRouter.post('/signin', UserController.signInUser);
userRouter.post('/signup', UserController.signUpUser);
// userRouter.get('/auth/verify', verifyJWT, usuarioController.verifyAuth)

export default userRouter;