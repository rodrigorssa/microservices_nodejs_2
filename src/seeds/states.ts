import { EstadoService } from '../services'
import EstadosModel from '../models/Estados'
import Logger from '../services/logger'

export default class ImportStates {
  async importStates () {
    const IBGEStates = await new EstadoService().getEstados()
    const estadosModel = new EstadosModel()
    const arrayOfStates = estadosModel.buildArrayofStates(IBGEStates.data)
    estadosModel.importStates(arrayOfStates)
    Logger.info('States has been sucessfully imported.')
  }
}
