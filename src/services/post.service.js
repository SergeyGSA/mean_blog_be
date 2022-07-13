import { ApiError } from '../exceptions/api-error.js'
import PostModel from '../models/Post.js'
import { UserDto } from '../dto/user.dto.js'

class PostService {
  async create(title, text, imageUrl = '', tags = [], id) {
    // Checking is text unique
    const possibleText = await PostModel.findOne({ text })
    if (possibleText) {
      throw ApiError.BadRequest(
        'Post with this text already exists. The text must be unique',
      )
    }

    const doc = new PostModel({
      title,
      text,
      imageUrl,
      tags: tags.split(','),
      user: id,
    })

    const post = await doc.save()
    return post
  }

  async getAll() {
    const posts = await PostModel.find().populate('user').exec()
    return posts.map((post) => {
      const userDto = new UserDto(post.user) // email, id
      return { ...post._doc, user: userDto }
    })
  }

  async getOne(postId) {
    if (postId.length !== 24) {
      throw ApiError.BadRequest('Invalid link')
    }

    const possiblePost = await PostModel.findOne({ _id: postId })
    if (!possiblePost) {
      throw ApiError.NotFound('The post is not found')
    }

    const post = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      },
    ).populate('user')

    const { user } = post
    const userDto = new UserDto(user) // email, id
    return { ...post._doc, user: userDto }
  }

  async remove(postId) {
    if (postId.length !== 24) {
      throw ApiError.BadRequest('Invalid link')
    }

    const possiblePost = await PostModel.findOne({ _id: postId })
    if (!possiblePost) {
      throw ApiError.NotFound('The post is not found')
    }

    const post = await PostModel.findOneAndDelete({
      _id: postId,
    })
    return post
  }

  async update(title, text, imageUrl, tags, user, postId) {
    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title,
        text,
        imageUrl,
        tags: tags.split(','),
        user,
      },
    )
  }
}

export const postService = new PostService()
