const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Html is easy',
        author: 'fullstackopen',
    },
    {
        title: 'Browser can execute only JavaScript',
        author: 'fullstackopen',
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon', author: 'meikä'})
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const User = require('../models/user')



const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, 
  nonExistingId, 
  blogsInDb,
  usersInDb,
}
