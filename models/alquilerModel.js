import mongoose from "mongoose";

const alquilerSchema = new mongoose.Schema({
    herramienta_alquilada: {
        type: String,
        required: true
    },
    usuario: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
});
const Alquiler = mongoose.model('Alquiler', alquilerSchema);

export default Alquiler;