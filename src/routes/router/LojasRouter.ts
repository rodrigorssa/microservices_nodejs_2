import LojaController from '../../controllers/LojaController'
import { LojaService } from '../../services/index'

export class LojasRouter {
  static router (app) {
    app.get('/', (req:any, res:any) => {
      res.redirect(301, '/lojas')
    })

    app.get('/lojas', new LojaController().getAll)

    app.get('/lojas/estados/:param', new LojaController().getByState)

    app.get('/lojas/id/:param', new LojaController().getById)

    app.get('/lojas/:estado/:cidade', new LojaController().getByState)

    app.get('/lojas/importar', new LojaService().postJSON)

    app.post('/lojas/inserir-loja', new LojaController().post)

    app.post('/lojas/busca-por-cidades', new LojaController().getAll)

    app.put('/lojas/atualiza/:id', new LojaController().put)

    app.delete('/lojas/deleta/:id', new LojaController().delete)
  }
}
