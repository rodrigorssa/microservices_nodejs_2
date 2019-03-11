import LojaController from '../controllers/lojaController'
import { createConnection } from 'typeorm'

export default (app:any) => {

    createConnection().then(async () => {
        
        app.post('/lojas',(req:any,res:any) => {
            //instanciando objeto Controller e passando os dados de request e response
            let lojaController = new LojaController()
                lojaController.post(req,res)
        })

        
})
}