import { body } from 'express-validator'

export const loginValidation = [
  body('email', 'Invalid mail').isEmail(),
  body('password', 'Invalid password').isLength({
    min: 5,
    max: 32,
  }),
]

export const registerValidation = [
  body('email', 'Invalid mail').isEmail(),
  body('password', 'Password must be at least 5 characters')
    .isLength({
      min: 5,
      max: 32,
    })
    .isString(),
  body('fullName', 'Enter your name').isLength({ min: 3 }),
  body('avatarUrl', 'Invalid avatar link').isURL(),
]

export const postCreateValidation = [
  body('title', 'Enter article`s title').isLength({ min: 3 }).isString(),
  body('text', 'Enter article`s text').isLength({ min: 3 }).isString(),
  body('tags', 'Wrong tag format').optional().isString(),
  body('imageUrl', 'Invalid image link').optional().isString(),
]
