import { getConnection, Connection } from 'typeorm'
import { Estado } from '../entity/index'
import logger from '../services/logger'

export default class Estados {
  private _connection: Connection
  private ibgeStates:Array<Estado>
  constructor () {
    this._connection = getConnection()
    this.ibgeStates = []
  }

  async importStates (arrayOfStates: Array<Estado>):Promise<any> {
    try {
      for (const state of arrayOfStates) {
        await this._connection.manager.save(state)
      }
    } catch (err) {
      logger.error(`Failed to save state. Error : ${err}`)
    }
  }

  buildArrayofStates (IBGEResponse:[any]):Array<Estado> {
    for (let index = 0; index < IBGEResponse.length; index++) {
      const EstadoEntity = new Estado()
      EstadoEntity.id = IBGEResponse[index].id
      EstadoEntity.nome = IBGEResponse[index].nome
      EstadoEntity.sigla = IBGEResponse[index].sigla

      this.ibgeStates.push(EstadoEntity)
    }
    return this.ibgeStates
  }

  getAll () {
    return this._connection.manager.find(Estado).catch(err => console.log(err))
  }

  getById (id:number) {
    return this._connection.manager.findOne(Estado, id).catch(err => console.log(err))
  }
}
