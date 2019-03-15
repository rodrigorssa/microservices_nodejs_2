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

    getAll(req:Request,res:Response){
        let cidades = new CidadeController()
            cidades.getAll(req, res)
    }

    getByName(req:Request,res:Response){
        let cidades = new CidadeController()
            cidades.getByName(req, res)
    }
    getPagination(req:Request,res:Response){
        let cidades = new CidadeController()
            cidades.getPagination(req, res)
    }

    router(){
        app.get('/cidades/importar',this.getCidades)
        app.get('/cidades',(req,res) => {
            res.redirect(301,'/cidades/pagina/1')
        })
        app.get('/cidades/:nome',this.getByName)
        app.get('/cidades/pagina/:index',this.getPagination)
    }
}