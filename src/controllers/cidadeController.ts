import { Cidade } from '../entity/Cidade'
import { CidadeService } from '../services/index'
import { Request, Response } from 'express'
import Cidades  from '../models/Cidades'

export default class CidadeController {

    async importarCidades(req:Request,res:Response){
        let cidades = new CidadeService()  
            cidades.getCidades()
            .then(result => {
                if(!result) return res.status(400).json('Nenhuma cidade encontrada.')

                let count = 0

                result.data.forEach(element => {
                    let obj = new Cidade()
                        obj.id = element.id
                        obj.cidade = element.nome
                        obj.estado = element.microrregiao.mesorregiao.UF.id
                    let query = new Cidades()
                        query.importarCidades(obj)

                    count++
                });

                return res.status(200).send(count + ' cidades importadas com sucesso!')
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json('Erro interno do servidor')
            })
    }

}