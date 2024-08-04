import mongoose, { Schema } from "mongoose";

const usuarioSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "El nombre de usuario es obligatorio."]
    },
    email: {
        type: String,
        required: [true, "El email es obligatorio."],
        unique: [true, "Ya existe este email. Probá con uno diferente."],
        match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "La dirección de email es inválida."]
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria."],
        minlength: [8, "La contraseña debe contener al menos 8 caracteres."],
        maxlength: [256, "La contraseña supera los 256 caracteres, probá con una diferente."]
    }
}, {
    timestamps: true
});
const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;