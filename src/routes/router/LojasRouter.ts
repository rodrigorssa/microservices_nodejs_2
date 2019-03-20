import { Request, Response }  from 'express'
import LojaController from '../../controllers/LojaController'
import { LojaService } from '../../services/index'

export class LojasRouter {

    _app;

    constructor(app){
        this._app = app
        this.router()
    }

    getAll(req:Request, res:Response)  {    
        let lojaController = new LojaController()
            lojaController.getAll(req,res)
    }

    post(req:Request, res:Response) {
        //instanciando objeto Controller e passando os dados de request e response
        let lojaController = new LojaController()
            lojaController.post(req,res)
    }

    getStateCity(req:Request, res:Response){        
        let lojaController = new LojaController()
            lojaController.getAll(req,res)
    }

    getById(req:Request, res:Response) {
        let param = req.params.param    
        let lojaController = new LojaController()
        lojaController.getById(req,res,param)     
    }

    getByState(req:Request, res:Response){
        let param = req.params.param  
        let lojaController = new LojaController()
        lojaController.getByState(req,res,param)
    }

    put(req:Request, res:Response){
        let id = req.params.id     
        let lojaController = new LojaController()
            lojaController.put(req,res,id)
    }
    
    deletar(req:Request, res:Response) {     
        let lojaController = new LojaController()
            lojaController.delete(req,res)
    }

    importaLojas(req:Request, res:Response){
        let lojaServico = new LojaService()
            lojaServico.postJSON(req,res)
    }

    router(){

        this._app.get('/',(req:any,res:any) => {
            res.redirect(301, '/lojas')
        })

        this._app.get('/lojas',this.getAll)
        
        this._app.get('/lojas/estados/:param',this.getByState)

        this._app.get('/lojas/id/:param',this.getById)
        
        this._app.get('/lojas/:estado/:cidade',this.getStateCity)
        
        this._app.get('/lojas/importar',this.importaLojas)
        
        this._app.post('/lojas/inserir-loja',this.post)
        
        this._app.post('/lojas/busca-por-cidades',this.getAll)
            
        this._app.put('/lojas/atualiza/:id',this.put)

        this._app.delete('/lojas/deleta/:id',this.deletar)



    }
    
} 