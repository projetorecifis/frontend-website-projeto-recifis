import { Router } from 'express'
import UserController from '../controllers/user.controller'
// import verifyJWT from '../middleware/user.auth'

const userRouter = Router()

userRouter.get('/teste', UserController.getTeste)
// userRouter.post('/signIn', usuarioController.signInUser)
// userRouter.get('/auth/verify', verifyJWT, usuarioController.verifyAuth)

export default userRouter