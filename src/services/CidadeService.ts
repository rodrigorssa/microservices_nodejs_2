import axios from 'axios'
import { cidadesLink } from '../../config/env_vars'

export class CidadeService{

    async getCidades(){
        return await axios.get(cidadesLink)
            .then(res => res )
            .catch(err => console.log(err))
    }
}