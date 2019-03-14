import { Request, Response }  from 'express'
import LojaController from '../controllers/lojaController'

export default class LojasRouter {

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
        //consultando por cidade e estado
        let params = req.params
        console.log(params)        
        let lojaController = new LojaController()
            lojaController.getAll(req,res,params)
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
        let id = req.params.id         
        let lojaController = new LojaController()
            lojaController.delete(id,req,res)
    }

    router(){

        this._app.get('/',(req:any,res:any) => {
            res.redirect(301, '/lojas')
        })

        this._app.route('/lojas')
            .get(this.getAll)
            .post(this.post)
        
        this._app.route('/lojas/:id')
            .put(this.put)
            .delete(this.deletar)

        this._app.route('/lojas/:param')
            .get(this.getParam)

        this._app.route('/lojas/:state/:city')
            .get(this.getStateCity)
    }
} 