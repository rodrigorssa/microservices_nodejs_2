import ImportCities from './cities'
import ImportStates from './states'
import Logger from '../services/logger'
import { createConnection } from 'typeorm'

class Seeds {
  private cities: ImportCities
  private states: ImportStates

  constructor () {
    this.cities = new ImportCities()
    this.states = new ImportStates()
  }

  private addCitiesToDB () {
    return this.cities.importCities()
  }

  private addStatesToDB () {
    return this.states.importStates()
  }

  async execute ():Promise<void> {
    try {
      await createConnection().then(() => {
        Logger.info('DB Connected.')
      })

      await this.addStatesToDB()
      await this.addCitiesToDB()
      process.exit(0)
    } catch (error) {
      Logger.error(error)
      process.exit(0)
    }
  }
}

export default new Seeds().execute()
