import usuariosRouter from './usuariosRouter.js'
import herramientasRouter from './herramientasRouter.js'
import categoriasRouter from './categoriasRouter.js'
import alquileresRouter from './alquileresRouter.js'

export function routerAPI(app) {
    app.use('/usuarios', usuariosRouter);
    app.use('/herramientas', herramientasRouter);
    app.use('/categorias', categoriasRouter);
    app.use('/alquileres', alquileresRouter);
}