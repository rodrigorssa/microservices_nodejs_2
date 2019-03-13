import LojaController from '../controllers/lojaController'
import { createConnection } from 'typeorm'

export default (app:any) => {

    createConnection().then(async () => {
           
        app.get('/',(req:any,res:any) => {
            res.redirect(301, '/lojas')
        })

        app.get('/lojas/:state/:city',(req:any,res:any) => {

            let params = req.params
            let lojaController = new LojaController()
                lojaController.getAll(req,res,params)

        })
        
        app.get('/lojas/:param',(req:any,res:any) => {

            let param = req.params.param
            //verificando se o tipo de parametro é um numero, caso sim, consulta o ID da loja
            if(!isNaN(param)){
                let lojaController = new LojaController()
                lojaController.getById(req,res,param)
            }else{
                //casp seja texto, busca por estado
                let lojaController = new LojaController()
                lojaController.getByState(req,res,param)
            }


        })
        
        app.route('/lojas/')
        .get((req:any,res:any) => {
    
            let lojaController = new LojaController()
            lojaController.getAll(req,res)

        })
        .post((req:any,res:any) => {
        //instanciando objeto Controller e passando os dados de request e response
        let lojaController = new LojaController()
            lojaController.post(req,res)
        })

        app.route('/lojas/:id')
        .put((req:any,res:any) => {
            let id = req.params.id
            let lojaController = new LojaController()
                lojaController.put(req,res,id)
        })
        .delete((req:any,res:any) => {
            let id = req.params.id 
            let lojaController = new LojaController()
                lojaController.delete(id,req,res)
        })

        //caso não encontre nenhuma rota
        app.use((req, res) => {
            res.status(404).json({errorCode: 404, msg: 'Pagina não encontrada!'});
        });


})
}