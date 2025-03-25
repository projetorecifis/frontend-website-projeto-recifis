import { Router } from 'express'
import PodcastsController from '../controllers/podcasts.controller'
import { uploadAvatar } from '../config/multer';
import multer from 'multer';
import { count } from 'console';

const podcastsRouter = Router();

podcastsRouter.get('/getAll', PodcastsController.getAllPodcasts);
podcastsRouter.post('/create', multer(uploadAvatar.getConfig).single("image"), PodcastsController.postPodcast);
podcastsRouter.put('/update/:id', multer(uploadAvatar.getConfig).single("image"), PodcastsController.updatePodcast);
podcastsRouter.delete('/delete/:id', PodcastsController.deletePodcast);
// countentRouter.delete('/podcasts/delete/:id', PodcastsController.deletePodcast);
// podcastsRouter.delete('/podcasts/delete/:id', PodcastsController.deletePodcast);
// podcastsRouter.get('/podcasts/getById/:id', PodcastsController.getpodcastsById)


// podcastsRouter.post('/signIn', usuarioController.signIncontent)
// podcastsRouter.get('/auth/verify', verifyJWT, usuarioController.verifyAuth)

export default podcastsRouter;