import { Router } from 'express'

import { registerValidation, postCreateValidation } from '../validations.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { postController } from '../controllers/PostController.js'
import { userController } from '../controllers/UserController.js'

export const router = new Router()

router.post('/auth/register', registerValidation, userController.register)
router.post('/auth/login', userController.login)
router.post('/auth/logout', userController.logout)
router.get('/auth/refresh', authMiddleware, userController.refresh)

// router.get('/tags', PostController.getLastTags)

router.get('/posts', postController.getAll)
// router.get('/posts/tags', PostController.getLastTags)
router.get('/posts/:id', postController.getOne)
router.post(
  '/posts',
  authMiddleware,
  postCreateValidation,
  postController.create,
)
router.delete('/posts/:id', authMiddleware, postController.remove)
router.patch(
  '/posts/:id',
  authMiddleware,
  postCreateValidation,
  postController.update,
)
