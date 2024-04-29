import Categoria from "../models/categoriaModel.js";

async function createCategoria(req, res) {
    try {
        const nuevaCategoria = new Categoria(req.body);
        await nuevaCategoria.save();

        res.status(200).json({nuevaCategoria});
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: error, data: []})
    }
}

async function getCategorias(req, res) {
    try {
        const categorias = await Categoria.find();
        res.status(200).json({msg: 'ok', data: categorias});
    } catch (error) {
        res.status(500).json({msg: error, data: []})
    }
}

async function getCategoriaById(req, res) {
    try {
        const categoria = await Categoria.findById(req.params.id);

        if(!categoria) {
            return res.status(404).send('Categoria no encontrada.')
        }
        res.status(200).json(categoria)
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: error, data: []})
    }
}

async function updateCategoria(req, res) {
    const id = req.params.id;
    const categoria = req.body;
    try {
        const categoriaNew = await Herramienta.findByIdAndUpdate(id, categoria);
        if(categoriaNew) {
             res.status(200).json({msg:'Categoria editada con éxito.'});
        } else {
            return res.status(404).json({msg:'Categoria no encontrada!'});
        }
    } catch(error) {
        console.error('Error al intentar editar la categoria.', error);
        res.status(500).json({ msg: 'Error al intentar editar la categoria.' });
    }
    
}

async function deleteCategoria(req, res) {
    const categoriaId = req.params.id;
    try {
        const categoria = await Categoria.findById(categoriaId);
        if(!categoria) {
            return res.status(404).json({msg:'Categoria no encontrada!'});
        }
        await Categoria.findByIdAndDelete(categoriaId);
        return res.status(200).json({msg:'Categoria eliminada con éxito.'});
    } catch(error) {
        console.error('Error al intentar eliminar la categoria.', error);
        res.status(500).json({ message: 'Error al intentar eliminar la categoria.' });
    }
}

export {createCategoria, getCategorias, getCategoriaById, updateCategoria, deleteCategoria}