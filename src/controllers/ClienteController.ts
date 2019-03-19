import Clientes from '../models/Clientes'
import { Cliente } from '../entity/Cliente'
import { Request, Response } from 'express'
import * as Errors from '../helpers/errors'

export default class ClienteController {

    async getAll(req:Request , res:Response){
        let clientes = new Clientes()
        let query = await clientes.getAll().catch(err => {
            console.log(err);
            return res.status(500).json(Errors.sendError500())
        })

        if(!query) return res.status(404).json(Errors.sendError404())

        return res.status(200).json(query) 
    }

    async getByCPF(req:Request , res:Response){
        let query = await this.ifExists(req.params.cpf, req, res)     
        return res.status(200).json(query) 
    }

    async update(req:Request , res:Response){

        await this.ifExists(req.params.cpf, req, res)

        let cliente = new Cliente()
        cliente.cpf = req.params.cpf
        cliente.loja = req.body.loja

        let clientes = new Clientes()
        let query = await clientes.update(cliente).catch(err => {
            console.log(err);
            return res.status(500).json(Errors.sendError500())
        })

        if(!query) return res.status(404).json(Errors.sendError404())

        return res.status(200).json(query) 
    }

    async delete(req:Request , res:Response) {

       await this.ifExists(req.params.cpf, req, res)

        let query = await new Clientes().delete(req.params.cpf).catch(err => {
            console.log(err);
            return res.status(500).json(Errors.sendError500())
        })

        return res.status(200).send('Deletado com sucesso!')

    }

    //função de verificar CPF e de retorno de erros
    async ifExists(cpf:number,req:Request , res:Response) {
        let clientes = new Clientes()
        let dados = await clientes.getByCPF(req.params.cpf).catch(err => {
            console.log(err);
            return res.status(500).json(Errors.sendError500())
        })  
        if(this.isEmpty(dados)) return res.status(404).json(Errors.sendError404())
        return dados;
    }

      //funçao de validação de retornos de objetos vazios

      isEmpty(result:any){
        return (!Object.keys(result).length)
    }
    
}