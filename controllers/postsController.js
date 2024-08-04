import Post from "../models/postModel.js";

async function createPost(req, res) {
    try {
        const nuevoPost = new Post(req.body);
        await nuevoPost.save();

        res.status(200).json({nuevoPost});
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: error, data: []})
    }
}

async function getPosts(req, res) {
    try {
        const posts = await Post.find();
        res.status(200).json({msg: 'ok', data: posts});
    } catch (error) {
        res.status(500).json({msg: error, data: []})
    }
}

async function getPostById(req, res) {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).send('Post no encontrado.')
        }
        res.status(200).json(post)
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: error, data: []})
    }
}

async function updatePost(req, res) {
    const id = req.params.id;
    const post = req.body;
    try {
        const postNew = await Post.findByIdAndUpdate(id, post);
        if(postNew) {
             res.status(200).json({msg:'Post editado con éxito.'});
        } else {
            return res.status(404).json({msg:'Post no encontrado!'});
        }
    } catch(error) {
        console.error('Error al intentar editar el post.', error);
        res.status(500).json({ msg: 'Error al intentar editar el post.' });
    }
    
}

async function deletePost(req, res) {
    const postId = req.params.id;
    try {
        const post = await Post.findById(postId);
        if(!post) {
            return res.status(404).json({msg:'Post no encontrado!'});
        }
        await Post.findByIdAndDelete(postId);
        return res.status(200).json({msg:'Post eliminado con éxito.'});
    } catch(error) {
        console.error('Error al intentar eliminar el post.', error);
        res.status(500).json({ message: 'Error al intentar eliminar el post.' });
    }
}

export {createPost, getPosts, getPostById, updatePost, deletePost}