import  mongoose  from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
    try{
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages)
    }catch(err) {
        res.status(404).json({message: err.message})
    }
}

export const createPosts = async(req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);

    try{
        await newPost.save();
        res.status(201).json(newPost);
    }catch(err) {
        res.status(409).json({message: err.message})
    }
}

export const updatePost = async(req, res) => {
    const {id: _id} = req.params;
    const post = req.body;
    try{
       if(!mongoose.Types.ObjectId.isValid(_id)) {
           return res.status(404).send("No post found with that id: "+_id);
       }
       const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new:true});
       res.json(updatedPost);
    }catch(err) {
        res.status(409).json({message: err.message})
    }
}

export const deletePost = async(req, res) => {
    const { id : _id} = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send("No post found with that id: "+_id);
        }
        await PostMessage.findByIdAndRemove(_id);
        res.json({message: "Post deleted successfully !!"})  
    }catch(err) {
        res.status(409).json({message: err.message})
    }
}

export const likePost = async(req, res) => {
    const {id: _id} = req.params;
    try{
       if(!mongoose.Types.ObjectId.isValid(_id)) {
           return res.status(404).send("No post found with that id: "+_id);
       }
       const post = await PostMessage.findById(_id);
       const likePost = await PostMessage.findByIdAndUpdate(_id, {likeCount: post.likeCount + 1}, {new:true});
       res.json(likePost);
    }catch(err) {
        res.status(409).json({message: err.message})
    }
}

export const getPost = async(req, res) => {
    const {id: _id} = req.params;
    try{
       if(!mongoose.Types.ObjectId.isValid(_id)) {
           return res.status(404).send("No post found with that id: "+_id);
       }
       const post = await PostMessage.findById(_id);
       res.status(200).json(post);
    }catch(err) {
        res.status(409).json({message: err.message})
    }
}



