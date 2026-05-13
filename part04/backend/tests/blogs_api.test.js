const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as josn', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(e => e.title)
    assert.strictEqual(titles.includes('Html is easy'), true)
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'fullstackopen',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(r => r.title)  
    assert(titles.includes('async/await simplifies making async calls'))
})

test('blog without title or author are not added', async () => {
    const newBlog = {
        author: 'fullstackopen'
    }

    const result = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    
    // console.log(result)

    assert.strictEqual(result.status, 400)

  const newBlog2 = {
    title: 'Meikä mandoliinin seikkalut'
  }

  const result2 = await api
    .post('/api/blogs')
    .send(newBlog2)
    .expect(400)

  const blogsAtEnd2 = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd2.length, helper.initialBlogs.length)
  assert.strictEqual(result2.status, 400)

})

test('a specific note can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(resultBlog.body, blogToView)
})

test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const ids = blogsAtEnd.map(n => n.id)
    assert (!ids.includes(blogToDelete.id))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

test('blogs have identifier named id', async () => {
  const blogs = await helper.blogsInDb()
  const testBlogToGet = blogs[0]

  const testBlog = await api
    .get(`/api/blogs/${testBlogToGet.id}`)
    .expect(200)
    // .expect('Content-Type', /applcation\/json/)

  // console.log(testBlog)
  assert.strictEqual(testBlog.body.hasOwnProperty('id'), true)
  // assert.strictEqual(!testBlog.hasOwnProperty('_id'))
})

test('blogs default to 0 likes', async () => {
  const blogs = await helper.blogsInDb()
  const blogToCompare = blogs[0]
  
  const blogInDb = await api
    .get(`/api/blogs/${blogToCompare.id}`)
    .expect(200)

  const blogBeforeDb = helper.initialBlogs[0]
  
  assert.strictEqual(blogBeforeDb.hasOwnProperty('likes'), false)
  // console.log(blogInDb) 
  assert.strictEqual(blogInDb.body.likes, 0)
})

test('blog updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedData = {
    title: blogToUpdate.title,
    author: blogToUpdate.author,
    likes: blogToUpdate.likes + 1
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedData)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const updatedBlog = blogsAtEnd.find(b => b.id === blogToUpdate.id)

  assert.strictEqual(updatedBlog.likes, blogToUpdate.likes + 1)
})

after(async () => {
    await mongoose.connection.close()
})
