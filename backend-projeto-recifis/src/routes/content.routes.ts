import { Router } from 'express'
import contentController from '../controllers/content.controller'
// import verifyJWT from '../middleware/content.auth'

const contentRouter = Router()

contentRouter.get('/news', contentController.getAllNews)
// contentRouter.post('/signIn', usuarioController.signIncontent)
// contentRouter.get('/auth/verify', verifyJWT, usuarioController.verifyAuth)

export default contentRouter