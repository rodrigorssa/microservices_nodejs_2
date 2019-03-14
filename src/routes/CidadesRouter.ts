import app from "../../config/custom-express";
import { Request, Response } from 'express'
import CidadeController from '../controllers/cidadeController'

export class CidadesRouter {
    
    _app;

    constructor(app){
        this._app = app
        this.router()
    }

    getCidades(req:Request,res:Response){
        let cidades = new CidadeController()
            cidades.importarCidades(req, res)
    }

    router(){
        app.get('/importar-cidades',this.getCidades)
    }
}