import Usuario from "../models/usuarioModel.js";
import bcrypt from 'bcryptjs';
import { createAccessToken } from "../jwt/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

async function createUsuario(req, res) {
    const { username, email, password } = req.body;
    try {
        const usuarioEncontrado = await Usuario.findOne({email});
        if(usuarioEncontrado) return res.status(400).json(["El email ya existe, probá con uno diferente."]);

        const passwordHash = await bcrypt.hash(password, 10)
        
        const nuevoUsuario = new Usuario({
            username,
            email,
            password: passwordHash
    });

        const usuarioGuardado = await nuevoUsuario.save();
        const token = await createAccessToken({id: usuarioGuardado._id})
        res.cookie('token', token);
        res.json({
            id: usuarioGuardado._id,
            username: usuarioGuardado.username,
            email: usuarioGuardado.email
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'ok', message: error.message})
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
        res.status(500).json({msg: 'ok', message: error.message})
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

async function perfil (req, res) {
    const usuarioEncontrado = await Usuario.findById(req.usuario.id);

    if(!usuarioEncontrado) return res.status(400).json({ message: 'Usuario no encontrado'});
    return res.json({
        id: usuarioEncontrado._id,
        username: usuarioEncontrado.email,
        email: usuarioEncontrado.email
    })
}

const verificar = async (req, res) => {
    const { token } = req.cookies;

    if(!token) return res.status(401).json({message: "No estas autorizado."});

    jwt.verify(token, TOKEN_SECRET, async (err, usuario) => {
        if(err) return res.status(401).json({message: "No estas autorizado."})
            
        const usuarioEncontrado = await Usuario.findById(usuario.id);
        if(!usuarioEncontrado) return res.status(401).json({message: "No estas autorizado."});

        return res.json({
            id: usuarioEncontrado._id,
            username: usuarioEncontrado.username,
            email: usuarioEncontrado.email
        });
    });
}

export {createUsuario, getUsuarios, perfil, login, logout, verificar}