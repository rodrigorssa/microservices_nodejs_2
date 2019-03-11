import {getConnection, Connection} from "typeorm";
import { Loja } from '../entity/index'

class Lojas {

    _connection: Connection

    constructor(){
        this._connection = getConnection()
    }

    salva(Loja:Loja){
        return this._connection.manager.save(Loja)
            .then(loja => loja)
            .catch(err => {
            console.log(err)
            throw new Error(err)
            })
    }
    
    buscaLojas(params: object = null){
        return this._connection.manager.find(Loja, params).catch(err => console.log(err))
    }

    buscaPorId(id:number){
        return this._connection.manager.findOne(Loja, id).catch(err => console.log(err))
    }

    buscaPorEstado(estado:string){
        return this._connection.manager.find(Loja, {state: estado} ).catch(err => console.log(err))
    }

    atualiza(query:Loja){
        return this._connection.manager.save(Loja,query)
            .then(loja => loja)
            .catch(err => console.log(err))
    }
}

export default Lojas