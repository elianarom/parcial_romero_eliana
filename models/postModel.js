import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "El título es obligatorio."]
    },
    description: {
        type: String,
        required: [true, "La descripción es obligatoria."]
    },
    date: {
        type: Date,
        default: Date.now,
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    }
});

const Post = mongoose.model('Post', postSchema);

export default Post;