import express from 'express';
import { createPost, deletePost, getPostById, getPosts, updatePost } from '../controllers/postsController.js';
const router = express.Router();
import { autenticar } from '../middlewares/autenticacion.js'
import { validar } from '../middlewares/validacion.middleware.js';
import { crearPostValidacion } from '../validaciones/post.validacion.js';

router.use(express.json());

router.get('/perfil', autenticar, getPosts);
router.get('/perfil/:id', autenticar, getPostById)
router.post('/perfil/', autenticar, validar(crearPostValidacion), createPost);
router.put('/perfil/:id', autenticar, updatePost);
router.delete('/perfil/:id', autenticar, deletePost);

export default router;

