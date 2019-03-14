import { getConnection ,Connection } from "typeorm";
import { Estado } from '../entity/index'

export default class Estados {

    _connection: Connection

    constructor(){
        this._connection = getConnection()
    }

    importarEstados(Estado:Estado){
        this._connection.manager.save(Estado)
        .then(res => console.log(res))
        .catch(err => {
        console.log(err)
        throw new Error(err)
        })
    }

    getAll(){
        return this._connection.manager.find(Estado).catch(err => console.log(err))
    }
}