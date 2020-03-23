import axios from 'axios'
import { CITIES_URL } from '../../config/env_vars'

export default class ClienteService {
  getClientsByLojaId (id) {
    return axios.get(`${CITIES_URL}/loja/${id}`)
  }
}
