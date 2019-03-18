import { Request, Response }  from 'express'
import LojaController from '../controllers/lojaController'
import { LojaService } from '../services/index'

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

    getParam(req:Request, res:Response) {
        let param = req.params.param   
        //verificando se o tipo de parametro é um numero, caso sim, consulta o ID da loja
        if(!isNaN(param)){
            let lojaController = new LojaController()
            lojaController.getById(req,res,param)
        }else{          
            //caso seja texto, busca por estado
            let lojaController = new LojaController()
            lojaController.getByState(req,res,param)
        }
    }

    put(req:any,res:any){
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

        this._app.route('/lojas')
            .get(this.getAll)
            .post(this.post)

        this._app.route('/lojas/importar')
            .get(this.importaLojas)
            

        this._app.route('/lojas/cidades')
            .post(this.getAll)
            
        this._app.route('/lojas/:id')
            .put(this.put)
            .delete(this.deletar)

        this._app.route('/lojas/:param')
            .get(this.getParam)

        this._app.route('/lojas/:estado/:cidade')
            .get(this.getStateCity)
    }
    
} 