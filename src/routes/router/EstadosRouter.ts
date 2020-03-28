import * as express from 'express'
import EstadoController from '../../controllers/EstadoController'

export class EstadosRouter {
  static router (app:express) {
    app.get('/estados', new EstadoController().getAll)
  }
}
