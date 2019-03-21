import axios from 'axios'
import { estadosLink } from '../../config/env_vars'

export class EstadoService{
    
   async getEstados(){
    return await axios.get(estadosLink)
        .then(res => res )
        .catch(err => console.log(err))
    }
    
}