import { Cidade } from '../entity/Cidade'
import { CidadeService } from '../services/index'
import { Request, Response } from 'express'
import Cidades from '../models/Cidades'
import * as Errors from '../helpers/errors'

export default class CidadeController {
  async importarCidades (req:Request, res:Response) {
    const cidades = new CidadeService()
    cidades.getCidades()
      .then(result => {
        if (!result) return res.status(400).json(Errors.sendMsgError(['Nenhuma cidade foi retornada.']))

        let count = 0
        const { data } = result

        for (let index = 0; index < data.length; index++) {
          const obj = new Cidade()
          obj.id = data[index].id
          obj.cidade = data[index].nome
          obj.estado = data[index].microrregiao.mesorregiao.UF.id

          const query = new Cidades()
          query.importarCidades(obj)

          count++
        }
        return res.status(200).send(count + ' cidades importadas com sucesso!')
      })
      .catch(err => {
        console.log(err)
        return res.status(500).json('Erro interno do servidor')
      })
  }

  async getAll (req:Request, res:Response) {
    const cidades = new Cidades()
    const query = await cidades.getAll()
    if (!query) res.status(404).json(Errors.sendError404())
    res.status(200).json(query)
  }

  async getByName (req:Request, res:Response) {
    const cidades = new Cidades()
    const query = await cidades.getByName(req.params.nome)
    if (this.isEmpty(query)) res.status(404).json(Errors.sendError404())
    res.status(200).json(query)
  }

  async getPagination (req:Request, res:Response) {
    const cidades = new Cidades()
    const query = await cidades.getPagination(req.params.index)
    if (this.isEmpty(query)) res.status(404).json(Errors.sendError404())
    res.status(200).json(query)
  }

  isEmpty (result:any) {
    return (!Object.keys(result).length)
  }
}
