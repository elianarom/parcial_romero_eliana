import express from 'express';
import { createPost, deletePost, getPostById, getPosts, updatePost } from '../controllers/postsController.js';
const router = express.Router();

router.use(express.json());

router.get('/', getPosts);
router.get('/:id', getPostById)
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;

