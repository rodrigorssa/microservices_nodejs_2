import { getConnection ,Connection } from "typeorm";
import { Cidade } from '../entity/index'

export default class Cidades {

    _connection: Connection

    constructor(){
        this._connection = getConnection()
    }

    importarCidades(Cidade:Cidade){
        this._connection.manager.save(Cidade)
        .catch(err => {
        console.log(err)
        throw new Error(err)
        })
    }
}