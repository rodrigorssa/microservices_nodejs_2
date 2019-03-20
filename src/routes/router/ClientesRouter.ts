import { Request, Response } from 'express'
import ClienteController from '../../controllers/ClienteController'
import { ClienteService } from '../../services/index'

export class ClientesRouter {
    
    _app;

    constructor(app){
        this._app = app
        this.router()
    }

    importarClientes(req:Request,res:Response){
        new ClienteService().importarClientes(req,res)
    }

    getAll(req:Request,res:Response){
        let clientes = new ClienteController()
            clientes.getAll(req, res)
    }

    getByCPF(req:Request,res:Response){
        let clientes = new ClienteController()
            clientes.getByCPF(req, res)
    }

    update(req:Request,res:Response){
        let clientes = new ClienteController()
            clientes.update(req, res)
    }

    delete(req:Request,res:Response){
        let clientes = new ClienteController()
            clientes.delete(req, res)
    }

    router(){
        this._app.get('/clientes',this.getAll)
        this._app.get('/clientes/importar',this.importarClientes)
        this._app.route('/clientes/:cpf')
            .get(this.getByCPF)
            .put(this.update)
            .delete(this.delete)
    }
}