import axios from 'axios'
import { CITIES_URL } from '../../config/env_vars'

export class CidadeService {
  getCidades () {
    return axios.get(CITIES_URL)
  }
}
