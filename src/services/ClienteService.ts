import axios from 'axios'
import * as Errors from '../helpers/errors'
import { clientesLink } from '../../config/env_vars'


export default class ClienteService {

    getClientsByLojaId(id){
        return axios.get(`${clientesLink}/loja/${id}`)
                .then(result => result.data)
                .catch(err => {
                    console.log(err);
                    return Errors.sendError500() })
    }

}