const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let count = 0

    for (let i = 0; i < blogs.length; i++) {
        count += blogs[i].likes
    }
    return count
}

const favouriteBlog = (blogs) => {
    let favourite = blogs[0]

    for (blog of blogs) {
        if (blog.likes > favourite.likes) {
            favourite = blog
        }
    }

    return favourite
}

const mostBlogs = (blogs) => {
    let counts = lodash.countBy(blogs, 'author')
    let topAuthor = lodash.maxBy(Object.keys(counts), (author) => counts[author])
    // console.log(topAuthor)
    return {
        author: topAuthor,
        blogs: counts[topAuthor]
    }
}

const mostLikes = (blogs) => {
    const authors = lodash.groupBy(blogs, 'author')
    // console.log(authors)

    const authorLikeCounts = Object.entries(authors).map(([authorName, authorBlogs]) => {
        return {
            author: authorName,
            likes: authorBlogs.reduce((sum, blog) => sum + blog.likes, 0)
        }
    })

    return lodash.maxBy(authorLikeCounts, 'likes')
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}