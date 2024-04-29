import Herramienta from "../models/herramientaModel.js";

async function createHerramienta(req, res) {
    try {
        const nuevaHerramienta = new Herramienta(req.body);
        await nuevaHerramienta.save();

        res.status(200).json({nuevaHerramienta});
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: error, data: []})
    }
}

async function getHerramientas(req, res) {
    try {
        const herramientas = await Herramienta.find();
        res.status(200).json({msg: 'ok', data: herramientas});
    } catch (error) {
        res.status(500).json({msg: error, data: []})
    }
}

async function getHerramientaById(req, res) {
    try {
        const herramienta = await Herramienta.findById(req.params.id);

        if(!herramienta) {
            return res.status(404).send('Herramienta no encontrada.')
        }
        res.status(200).json(herramienta)
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: error, data: []})
    }
}

async function updateHerramienta(req, res) {
    const id = req.params.id;
    const herramienta = req.body;
    try {
        const herramientaNew = await Herramienta.findByIdAndUpdate(id, herramienta);
        if(herramientaNew) {
             res.status(200).json({msg:'Herramienta editada con éxito.'});
        } else {
            return res.status(404).json({msg:'Herramienta no encontrada!'});
        }
    } catch(error) {
        console.error('Error al intentar editar la herramienta.', error);
        res.status(500).json({ msg: 'Error al intentar editar la herramienta.' });
    }
    
}

async function deleteHerramienta(req, res) {
    const herramientaId = req.params.id;
    try {
        const herramienta = await Herramienta.findById(herramientaId);
        if(!herramienta) {
            return res.status(404).json({msg:'Herramienta no encontrada!'});
        }
        await Herramienta.findByIdAndDelete(herramientaId);
        return res.status(200).json({msg:'Herramienta eliminada con éxito.'});
    } catch(error) {
        console.error('Error al intentar eliminar la herramienta.', error);
        res.status(500).json({ message: 'Error al intentar eliminar la herramienta.' });
    }
}

export {createHerramienta, getHerramientas, getHerramientaById, updateHerramienta, deleteHerramienta}