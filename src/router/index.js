import { Router } from 'express'
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from '../validations.js'

import { authMiddleware } from '../middlewares/auth.middleware.js'

import { PostController } from '../controllers/index.js'
import { userController } from '../controllers/UserController.js'

export const router = new Router()

router.post('/auth/register', registerValidation, userController.register)
router.post('/auth/login', loginValidation, userController.login)
router.post('/auth/logout', userController.logout)
router.get('/auth/refresh', authMiddleware, userController.refresh)

// router.get('/auth/me', checkAuth, UserController.getMe)

router.get('/tags', PostController.getLastTags)

router.get('/posts', PostController.getAll)
router.get('/posts/tags', PostController.getLastTags)
router.get('/posts/:id', PostController.getOne)
router.post(
  '/posts',
  /* authMiddleware */ postCreateValidation,
  PostController.create,
)
router.delete('/posts/:id', /* authMiddleware */ PostController.remove)
router.patch(
  '/posts/:id',
  /* authMiddleware */
  postCreateValidation,
  PostController.update,
)
