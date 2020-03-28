import { getConnection, Connection } from 'typeorm'
import { Cidade } from '../entity/index'
import logger from '../services/logger'

export default class Cidades {
    private _connection: Connection
    private ibgeCities: Array<Cidade>

    constructor () {
      this._connection = getConnection()
      this.ibgeCities = []
    }

    async importCities (arrayOfCities: Array<Cidade>):Promise<any> {
      try {
        for (let index = 0; index < arrayOfCities.length; index++) {
          await this._connection.manager.save(arrayOfCities[index])
        }
      } catch (err) {
        logger.error(`Failed to save city. Error : ${err}`)
      }
    }

    buildArrayofCities (IBGEResponse:[any]):Array<Cidade> {
      for (let index = 0; index < IBGEResponse.length; index++) {
        const cidadeEntity = new Cidade()
        cidadeEntity.id = IBGEResponse[index].id
        cidadeEntity.cidade = IBGEResponse[index].nome
        cidadeEntity.estado = IBGEResponse[index].microrregiao.mesorregiao.UF.id

        this.ibgeCities.push(cidadeEntity)
      }

      return this.ibgeCities
    }

    getAll () {
      return this._connection.manager.find(Cidade, {
        relations: ['estado']
      }).catch(err => console.log(err))
    }

    getByName (nome : string) {
      return this._connection.manager.find(Cidade, { where: { cidade: nome }, relations: ['estado'] }).catch(err => console.log(err))
    }

    getById (id:number) {
      return this._connection.manager.findOne(Cidade, {
        relations: ['estado'],
        where: {
          id: id
        }
      }).catch(err => console.log(err))
    }

    getPagination (param:number) {
      const index = 100 * param
      return this._connection.manager.find(Cidade, { skip: index, take: 100, relations: ['estado'] }).catch(err => console.log(err))
    }
}
