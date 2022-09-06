import { body } from 'express-validator'

export const registerValidation = [
  body('email', 'Invalid mail').isEmail(),
  body('password', 'Password must be at least 5 characters')
    .isLength({
      min: 5,
      max: 32,
    })
    .isString(),
  body('fullName', 'Full name must be at least 3 characters').isLength({
    min: 3,
  }),
  body('avatarUrl', 'Invalid avatar link')
    .optional({ checkFalsy: true })
    .isURL(),
]

export const postCreateValidation = [
  body('title', 'Enter article`s title at least 3 characters')
    .isLength({ min: 3 })
    .isString(),
  body('text', 'Enter article`s text at least 3 characters')
    .isLength({ min: 3 })
    .isString(),
  body('tags', 'Wrong tag format').optional().isString(),
  body('imageUrl', 'Invalid image link').optional().isString(),
]
