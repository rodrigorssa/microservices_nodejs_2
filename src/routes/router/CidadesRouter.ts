import CidadeController from '../../controllers/CidadeController'

export class CidadesRouter {
  static router (app:any) {
    app.get('/cidades/importar', new CidadeController().importarCidades)
    app.get('/cidades', (_, res) => {
      res.redirect(301, '/cidades/pagina/1')
    })
    app.get('/cidades/:nome', new CidadeController().getByName)
    app.get('/cidades/pagina/:index', new CidadeController().getPagination)
  }
}
