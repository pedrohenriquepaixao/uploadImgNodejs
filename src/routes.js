const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');

const Post = require('./model/Post');

routes.get('/posts', async(req, res) =>{
    const posts = await Post.find()
    res.send(posts)
});

routes.delete('/posts/:id', async(req,res)=>{
    const post = await Post.findById(req.params.id);
    await post.remove();
    res.send();
})

routes.post("/posts",multer(multerConfig).single('file'),async (req, res) => {
    const{ originalname: name , size, key, location: url = ''} = req.file;
    const post = await Post.create({
        name,
        size,
        key,
        url,
    })
    res.json(post);
})

module.exports = routes;