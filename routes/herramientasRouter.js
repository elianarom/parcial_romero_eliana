import express from 'express';
import { createHerramienta, getHerramientas, getHerramientaById, updateHerramienta, deleteHerramienta} from '../controllers/herramientasController.js';
const router = express.Router();

router.use(express.json());

router.get('/', getHerramientas);
router.get('/:id', getHerramientaById)
router.post('/', createHerramienta);
router.put('/:id', updateHerramienta);
router.delete('/:id', deleteHerramienta);

export default router;

