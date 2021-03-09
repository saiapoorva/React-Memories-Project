import express from 'express';
import {getPosts, createPosts, updatePost, deletePost, likePost, getPost } from '../controllers/posts.js'


const router = express.Router();
router.get("/", getPosts)
router.post("/", createPosts)
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/likePost", likePost);
router.post("/:id", getPost)

export default router;