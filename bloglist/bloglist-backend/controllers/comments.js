const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.put('/:id', async (request, response) => {
  console.log('request', request)
  const comment = new Comment({ content: request })
  const createdComment = await comment.save()
  console.log('createdComent', createdComment)

  blog = await Blog.findById(request.params.id)

  let updatedBlog = await Blog.findByIdAndUpdate(
    { ...blog, comments: blog.comments.concat(createdComment) },
    { new: true }
  )
  updatedBlog = await Blog.findById(updatedBlog._id).populate('user')

  response.json(updatedBlog)
})

module.exports = commentsRouter
