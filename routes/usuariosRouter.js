import express from 'express';
import { getUsuarios, perfil, createUsuario, login, logout, verificar} from '../controllers/usuariosController.js';
const router = express.Router();
import { autenticar } from '../middlewares/autenticacion.js'
import { validar } from '../middlewares/validacion.middleware.js';
import { registroValidacion, loginValidacion } from '../validaciones/usuario.validacion.js';

router.use(express.json());

router.get('/', getUsuarios);
router.post('/login', validar(loginValidacion),login);
router.post('/logout', logout);
router.get('/perfil', autenticar, perfil);
router.post('/', validar(registroValidacion), createUsuario);
router.get('/verificar', verificar)

export default router;
