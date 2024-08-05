import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

async function autenticar(req, res, next) {
    const {token} = req.cookies;

    if(!token) {
        return res.status(401).json({message:'No se pasó el JWT'});
    }

    jwt.verify(token, TOKEN_SECRET, (error, usuario) => {
        if(error) return res.status(403).json({message:'JWT inválido'});
        req.usuario = usuario
        next();
    })
}

export {autenticar}