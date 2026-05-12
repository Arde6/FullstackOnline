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

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}