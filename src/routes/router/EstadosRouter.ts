import EstadoController from '../../controllers/EstadoController'

export class EstadosRouter {
  static router (app) {
    app.get('/estados/importar', new EstadoController().importarEstados)
    app.get('/estados', new EstadoController().getAll)
  }
}
