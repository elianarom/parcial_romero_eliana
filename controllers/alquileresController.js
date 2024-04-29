import Alquiler from "../models/alquilerModel.js";

async function createAlquiler(req, res) {
    try {
        const nuevoAlquiler = new Alquiler(req.body);
        await nuevoAlquiler.save();

        res.status(200).json({nuevoAlquiler});
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: error, data: []})
    }
}

async function getAlquileres(req, res) {
    try {
        const alquileres = await Alquiler.find();
        res.status(200).json({msg: 'ok', data: alquileres});
    } catch (error) {
        res.status(500).json({msg: error, data: []})
    }
}

async function getAlquilerById(req, res) {
    try {
        const alquiler = await Alquiler.findById(req.params.id);

        if(!alquiler) {
            return res.status(404).send('Alquiler no encontrado.')
        }
        res.status(200).json(alquiler)
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: error, data: []})
    }
}

async function updateAlquiler(req, res) {
    const {id} = req.params;
    const {herramienta_alquilada, usuario, estado} = req.body;
    try {
        const alquiler = await Alquiler.findById(id);
        if(!alquiler) {
            return res.status(404).json({msg:'Alquiler no encontrada!'});
        }

        alquiler.herramienta_alquilada = herramienta_alquilada;
        alquiler.usuario = usuario;
        alquiler.estado = estado;

        await alquiler.save();
        return res.status(200).json({msg:'Alquiler editada con éxito.'});
    } catch(error) {
        console.error('Error al intentar editar el alquiler.', error);
        res.status(500).json({ msg: 'Error al intentar editar el alquiler.' });
    }
}

async function deleteAlquiler(req, res) {
    const alquilerId = req.params.id;
    try {
        const alquiler = await Alquiler.findById(alquilerId);
        if(!alquiler) {
            return res.status(404).json({msg:'Alquiler no encontrado!'});
        }
        await Alquiler.findByIdAndDelete(alquilerId);
        return res.status(200).json({msg:'Alquiler eliminado con éxito.'});
    } catch(error) {
        console.error('Error al intentar eliminar el alquiler.', error);
        res.status(500).json({ message: 'Error al intentar eliminar el alquiler.' });
    }
}

export {createAlquiler, getAlquileres, getAlquilerById, updateAlquiler, deleteAlquiler}