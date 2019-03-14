import axios from 'axios'

export class CidadeService{

    _link = 'https://servicodados.ibge.gov.br/api/v1/localidades/municipios'

    async getCidades(){
        return await axios.get(this._link)
            .then(res => res )
            .catch(err => console.log(err))
    }
}