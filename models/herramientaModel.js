import mongoose from "mongoose";

const herramientaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    }
});

const Herramienta = mongoose.model('Herramienta', herramientaSchema);

export default Herramienta;