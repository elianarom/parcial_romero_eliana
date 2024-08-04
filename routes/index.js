import usuariosRouter from './usuariosRouter.js'
import postsRouter from './postsRouter.js'
import categoriasRouter from './categoriasRouter.js'

export function routerAPI(app) {
    app.use('/usuarios', usuariosRouter);
    app.use('/posts', postsRouter);
    app.use('/categorias', categoriasRouter);
}