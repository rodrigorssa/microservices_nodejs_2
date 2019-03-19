import Lojas from '../models/Lojas'
import Cidades from '../models/Cidades'
import { Loja, Cidade } from '../entity/index'
import { Request, Response } from 'express'
import * as Errors from '../helpers/errors'

export default class LojaController {

    async post(req:Request, res:Response){
        
        //nome dos campos do formulario
        let keys = ['name','address','phone','cnpj','workingHour','cidade.id','estado.id']

        //validando dados de entrada
        for (let index = 0; index < keys.length; index++) {
            req.assert(keys[index],`Campo ${keys[index]} é obrigatório.`).notEmpty()             
        }

        let err:any = req.validationErrors()

        //se tiver algum erro o post não envia e mostra mensagem de erro
        if(err) {
            let msg = Errors.sendMsgError(err.map( item => item.msg ))
            return res.status(400).json(msg)
       }

        //verificando se a cidade passada pertence ao estado inserido
        let cidades = new Cidades()
        let cidade = await cidades.getById(req.body.cidade.id)
                    .then((result:Cidade) => result)
                    .catch(err => {
                        console.log(err); 
                        return res.status(500).send(Errors.sendError500())})
        if(!cidade) return res.status(404).send(Errors.sendMsgError(['Cidade não encontrada']))
        if(cidade.estado.id != req.body.estado.id) return res.status(400).send(Errors.sendMsgError(['Cidade não pertence ao estado enviado']))
        
        //adicionando dados em variável, instanciando o objeto para salvar no bd
        let loja = new Loja()
        loja.name = req.body.name
        loja.address = req.body.address
        loja.phone = req.body.phone
        loja.cnpj = req.body.cnpj
        loja.workingHour = req.body.workingHour
        loja.cidade = req.body.cidade.id
        loja.estado = req.body.estado.id

        const lojas = new Lojas()
        let dados = await lojas.salva(loja)

        return res.status(201).json(dados)
    }

    async getAll(req:Request,res:Response){
        //verificando se existe parâmetro de entrada, se não houver, o parametro é null
        let params = (req.params) ? req.params : {}
        let body = (req.body.cidades) ? req.body.cidades : {}

        let obj = {
            params: params,
            body: body
        }

        const lojas = new Lojas()
        let query = await lojas.buscaLojas(obj)
        if(this.isEmpty(query)) return res.status(404).json(Errors.sendError404())
        return res.status(200).json(query)
    }

    async getById(req:Request,res:Response,id:number){
        const lojas = new Lojas()
            let query = await lojas.buscaPorId(id)
            if(!query) return res.status(404).json(Errors.sendError404())
            return res.status(200).json(query)
    }

    async getByState(req:Request,res:Response,state:string){
        const lojas = new Lojas()
        let query = await lojas.buscaPorEstado(state)
        if(this.isEmpty(query)) return res.status(404).json(Errors.sendError404())
        return res.status(200).json(query)
           
    }

    async put(req:any,res:any,id:number){
        //verificando se o ID existe no banco
        const lojas = new Lojas()
        let query = await lojas.buscaPorId(id)
        if(!query) return res.status(404).json(Errors.sendError404())
        
        //validando propriedades vazias
        let inputData = req.body;
        Object.keys(inputData).forEach(key => {if(inputData[key] == '')  delete inputData[key]} )
        
        let mergeDados = {...query,...inputData}
               
        let dadosAtualizados = await lojas.atualiza(mergeDados)      
        return res.status(200).json(dadosAtualizados)
    } 
    
    async delete(req:any,res:any){
        let { id } = req.params
        //verificando se o ID existe no banco
        const lojas = new Lojas()
            //lojas.buscaPorId(id)
        let query = await lojas.buscaPorId(id)      
        if(!query) return res.status(404).json(Errors.sendError404())
        
        await lojas.deletar(id)
        
        return res.status(200).json('Loja deletada com sucesso!')
    }

    //funçao de validação de retornos vazios

    isEmpty(result:any){
        return (!Object.keys(result).length)
    }

}