import axios from 'axios'

export class EstadoService{

    _link = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'

    constructor(){
        this.getEstados();
    }

   async getEstados(){
    return await axios.get(this._link)
    .then(res => res )
    .catch(err => console.log(err))
    }
}