import Usuario from "../models/usuarioModel.js";
import bcrypt from 'bcryptjs';
import { createAccessToken } from "../jwt/jwt.js";

async function createUsuario(req, res) {
    const { username, email, password } = req.body;
    try {
        const passwordHash = await bcrypt.hash(password, 10)
        
        const nuevoUsuario = new Usuario({
            username,
            email,
            password: passwordHash
    });

        const usuarioGuardado = await nuevoUsuario.save();
        const token = await createAccessToken({id: usuarioGuardado._id})
        res.cookie('token', token)
        res.json({
            id: usuarioGuardado._id,
            username: usuarioGuardado.username,
            email: usuarioGuardado.email
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message})
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    try {
        const usuarioEncontrado = await Usuario.findOne({email});

        if(!usuarioEncontrado) return res.status(400).json({ message: 'Usuario no encontrado.'})
        const coincide = await bcrypt.compare(password, usuarioEncontrado.password)
        if(!coincide) return res.status(400).json({ message: 'Credenciales incorrectas.'})

        const token = await createAccessToken({id: usuarioEncontrado._id})
        res.cookie('token', token)
        res.json({
            id: usuarioEncontrado._id,
            username: usuarioEncontrado.username,
            email: usuarioEncontrado.email
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message})
    }
}

async function logout(req, res) {
    res.cookie('token', '', {
        expires: new Date(0)
    })
    return res.sendStatus(200);
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
    const id = req.params.id;
    const usuario = req.body;
    try {
        const usuarioNew = await Herramienta.findByIdAndUpdate(id, usuario);
        if(usuarioNew) {
             res.status(200).json({msg:'Usuario editado con éxito.'});
        } else {
            return res.status(404).json({msg:'Usuario no encontrado!'});
        }
    } catch(error) {
        console.error('Error al intentar editar el usuario.', error);
        res.status(500).json({ msg: 'Error al intentar editar el usuario.' });
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

export {createUsuario, getUsuarios, getUsuarioById, updateUsuario, deleteUsuario, login, logout}