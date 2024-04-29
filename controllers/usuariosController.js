import Usuario from "../models/usuarioModel.js";

async function createUsuario(req, res) {
    try {
        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();

        res.status(200).json({nuevoUsuario});
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: error, data: []})
    }
}

async function getUsuarios(req, res) {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json({msg: 'ok', data: usuarios});
    } catch (error) {
        res.status(500).json({msg: error, data: []})
    }
}

async function getUsuarioById(req, res) {
    try {
        const usuario = await Usuario.findById(req.params.id);

        if(!usuario) {
            return res.status(404).send('Usuario no encontrado.')
        }
        res.status(200).json(usuario)
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: error, data: []})
    }
}

async function updateUsuario(req, res) {
    const {id} = req.params;
    const {name,email,password} = req.body;
    try {
        const usuario = await Usuario.findById(id);
        if(!usuario) {
            return res.status(404).json({msg:'Usuario no encontrado!'});
        }

        usuario.name = name;
        usuario.email = email;
        usuario.password = password;

        await usuario.save();
        return res.status(200).json({msg:'Usuario editado con éxito.'});
    } catch(error) {
        console.error('Error al intentar editar al usuario.', error);
        res.status(500).json({ msg: 'Error al intentar editar al usuario.' });
    }
}

async function deleteUsuario(req, res) {
    const usuarioId = req.params.id;
    try {
        const usuario = await Usuario.findById(usuarioId);
        if(!usuario) {
            return res.status(404).json({msg:'Usuario no encontrado!'});
        }
        await Usuario.findByIdAndDelete(usuarioId);
        return res.status(200).json({msg:'Usuario eliminado con éxito.'});
    } catch(error) {
        console.error('Error al intentar eliminar al usuario.', error);
        res.status(500).json({ message: 'Error al intentar eliminar al usuario.' });
    }
}

export {createUsuario, getUsuarios, getUsuarioById, updateUsuario, deleteUsuario}