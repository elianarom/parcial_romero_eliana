import express from 'express';
import { getAlquileres, getAlquilerById, createAlquiler, updateAlquiler, deleteAlquiler} from '../controllers/alquileresController.js';
const router = express.Router();

router.use(express.json());

router.get('/', getAlquileres);
router.get('/:id', getAlquilerById)
router.post('/', createAlquiler);
router.put('/:id', updateAlquiler);
router.delete('/:id', deleteAlquiler);

export default router;

