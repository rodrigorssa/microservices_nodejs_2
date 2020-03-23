import Lojas from '../models/Lojas'
import { Loja } from '../entity/index'
import { lojasJSON } from '../../config/lojas'

const data:any = lojasJSON

export class LojaService {
  async postJSON (req, res) {
    let count = 0

    for (let index = 0; index < data.length; index++) {
      const loja = new Loja()
      loja.name = data[index].name
      loja.address = data[index].address
      loja.cnpj = data[index].cnpj
      loja.phone = data[index].phone
      loja.workingHour = data[index].workingHour
      loja.estado = data[index].estado
      loja.cidade = data[index].cidade

      const lojas = new Lojas()
      await lojas.salva(loja)
      count++
    }
    res.status(201).send(count + ' lojas foram inseridas no banco!')
  }
}
