import Lojas from '../models/Lojas'
import { Loja } from '../entity/index'
import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'

class LojaController {

    async post(req:Request, res:Response){
        
        //validando dados de entrada
        req.assert('name','Campo name é obrigatório.').notEmpty()
        req.assert('address','Campo address é obrigatório.').notEmpty()
        req.assert('phone','Campo phone é obrigatório.').notEmpty()
        req.assert('cnpj','Campo cnpj é obrigatório.').notEmpty()
        req.assert('workingHour','Campo workingHour é obrigatório.').notEmpty()
        req.assert('city','Campo city é obrigatório.').notEmpty()
        req.assert('state','Campo state é obrigatório.').notEmpty()

        let err:any = req.validationErrors()

        //se tiver algum erro o post não envia e mostra mensagem de erro
        if(err) {
            let msg = {
                errorCode: 400,
                msg: err.map(item => item.msg )
            }
            return res.status(400).json(msg)
        }

        //adicionando dados em variável, instanciando o objeto para salvar no bd
        let loja = new Loja()
        loja.name = req.body.name
        loja.address = req.body.address
        loja.phone = req.body.phone
        loja.cnpj = req.body.cnpj
        loja.workingHour = req.body.workingHour
        loja.city = req.body.city
        loja.state = req.body.state

        const lojas = new Lojas()
        let dados = await lojas.salva(loja)

        return res.status(201).json(dados)
    }

    async getAll(req:Request,res:Response,params:object = null){
        const lojas = new Lojas()
        
        let query = await lojas.buscaLojas(params)

        if(this.isEmpty(query)) return res.status(404).json({errorCode : 404, msg:"Nenhuma loja encontrada"})

        return res.status(200).json(query)
    }

    async getById(req:Request,res:Response,id:number){
        const lojas = new Lojas()
            let query = await lojas.buscaPorId(id)
            if(!query) return res.status(404).json({errorCode : 404, msg:"Nenhuma loja encontrada"})
            return res.status(200).json(query)
    }

    async getByState(req:Request,res:Response,state:string){
        const lojas = new Lojas()
        let query = await lojas.buscaPorEstado(state)
        if(this.isEmpty(query)) return res.status(404).json({errorCode : 404, msg:"Nenhuma loja encontrada"})
        return res.status(200).json(query)
           
    }

    async put(req:Request, res:Response, id:number){
        //verificando se o ID existe no banco
        const lojas = new Lojas()
        let query = await lojas.buscaPorId(id)
        if(!query) return res.status(404).json({errorCode : 404, msg:"Nenhuma loja encontrada"})
        
        //validando propriedades vazias
        let inputData = req.body;
        Object.keys(inputData).forEach(key => {if(inputData[key] == '')  delete inputData[key]} )
        
        let mergeDados = {...query,...inputData}
               
        let dadosAtualizados = await lojas.atualiza(mergeDados)      
        return res.status(200).json(dadosAtualizados)
    } 
    
    async delete(id:number, req:Request, res:Response){
        //verificando se o ID existe no banco
        const lojas = new Lojas()
            //lojas.buscaPorId(id)
        let query = await lojas.buscaPorId(id)
        if(!query) return res.status(404).json({errorCode : 404, msg:"Nenhuma loja encontrada"})
        let status = await lojas.deletar(id)
        return res.status(200).json('Loja deletada com sucesso!')
    }

    login(req:Request, res: Response){
        req.assert('username','Campo username é obrigatório').notEmpty()
        req.assert('password','Campo password é obrigatório').notEmpty()

        let err = req.validationErrors()

        if(err){
            let msg = {
                errorCode: 400,
                msg: err.map(item => item.msg )
            }
           return res.status(401).json(msg)
        }

        let meuToken = jwt.sign({ username: req.body.username }, process.env.KEY)
        return res.status(200).send(meuToken)
    }

    //funçao de validação de retornos vazios

    isEmpty(result:any){
        if(Object.keys(result).length === 0 ) return true; else return false;
    }

}
export default LojaController