import { CidadeService } from '../services'
import CidadeModel from '../models/Cidades'
import Logger from '../services/logger'

export default class ImportCities {
  async importCities () {
    const IBGECities = await new CidadeService().getCidades()
    const cidadeModel = new CidadeModel()
    const arrayOfCities = cidadeModel.buildArrayofCities(IBGECities.data)
    cidadeModel.importCities(arrayOfCities)
    Logger.info('Cities has been sucessfully imported.')
  }
}
