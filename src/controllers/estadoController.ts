import { Estado } from '../entity/Estado'
import { EstadoService } from '../services/index'
import { Request, Response } from 'express'
import Estados from '../models/Estados'
import * as Errors from '../helpers/errors'

export default class EstadoController {
  async importarEstados (req:Request, res:Response) {
    const estados = new EstadoService()
    estados.getEstados()
      .then(result => {
        if (!result) return res.status(400).json(Errors.sendError404())

        let count = 0

        for (let index = 0; index < result.data.length; index++) {
          const obj = new Estado()
          obj.id = result.data[index].id
          obj.sigla = result.data[index].sigla
          obj.nome = result.data[index].nome
          const query = new Estados()
          query.importarEstados(obj)

          count++
        }

        return res.status(200).send(count + ' estados importados com sucesso!')
      })
      .catch(err => {
        console.log(err)
        return res.status(500).json(Errors.sendError500())
      })
  }

  async getAll (req:Request, res:Response) {
    const estados = new Estados()
    const query = await estados.getAll()
    if (!query) res.status(404).json(Errors.sendError404())
    return res.status(200).json(query)
  }

  isEmpty (result:any) {
    return (!Object.keys(result).length)
  }
}
