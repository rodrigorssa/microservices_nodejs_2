import app from "../../config/custom-express";
import { Request, Response } from 'express'
import EstadoController from '../controllers/estadoController'

export class EstadosRouter {
    
    _app;

    constructor(app){
        this._app = app
        this.router()
    }

    getEstados(req:Request,res:Response){
        let cidades = new EstadoController()
            cidades.importarEstados(req, res)
    }

    getAll(req:Request,res:Response){
        let cidades = new EstadoController()
            cidades.getAll(req, res)
    }

    router(){
        app.get('/estados/importar',this.getEstados)
        app.get('/estados',this.getAll)
    }
}