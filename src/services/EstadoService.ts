import axios from 'axios'
import { STATES_URL } from '../../config/env_vars'

export class EstadoService {
  getEstados () {
    return axios.get(STATES_URL)
  }
}
