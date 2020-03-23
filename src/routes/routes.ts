import { LojasRouter, CidadesRouter, EstadosRouter } from './index'
export default (app) => {
  LojasRouter.router(app)
  CidadesRouter.router(app)
  EstadosRouter.router(app)

  app.use((_, res) => {
    res.status(404).json({ errorCode: 404, msg: 'Pagina não encontrada!' })
  })
}
