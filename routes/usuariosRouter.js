import express from 'express';
import { getUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario, login, logout} from '../controllers/usuariosController.js';
const router = express.Router();

router.use(express.json());

router.get('/', getUsuarios);
router.post('/login', login);
router.post('/logout', logout)
router.get('/:id', getUsuarioById)
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

export default router;
