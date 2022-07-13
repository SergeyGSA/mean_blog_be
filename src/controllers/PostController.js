// import PostModel from '../models/Post.js'
import { validationResult } from 'express-validator'

import { postService } from '../services/post.service.js'
import { ApiError } from '../exceptions/api-error.js'

// export const getLastTags = async (req, res) => {
//   try {
//     const posts = await PostModel.find().limit(5).exec()

//     const tags = posts
//       .map((obj) => obj.tags)
//       .flat()
//       .slice(0, 5)

//     res.json(tags)
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({
//       message: 'Не удалось получить тэги',
//     })
//   }
// }

class PostController {
  async create(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()))
      }

      const { title, text, imageUrl, tags, user } = req.body
      const postData = await postService.create(
        title,
        text,
        imageUrl,
        tags,
        user,
      )

      res.json(postData)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const posts = await postService.getAll()
      res.json(posts)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const postId = req.params.id
      const post = await postService.getOne(postId)
      res.json(post)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const postId = req.params.id
      const post = await postService.remove(postId)
      res.json({ success: true, title: post.title })
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const { title, text, imageUrl, tags, user, _id } = req.body
      const updatedPost = await postService.update(
        title,
        text,
        imageUrl,
        tags,
        user,
        _id,
      )
      res.json({ success: true })
    } catch (error) {
      next(error)
    }
  }
}

export const postController = new PostController()
