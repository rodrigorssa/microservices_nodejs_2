import { getConnection ,Connection } from "typeorm";
import { Cidade } from '../entity/index'

export default class Cidades {

    _connection: Connection

    constructor(){
        this._connection = getConnection()
    }

    importarCidades(Cidade:Cidade){
        return this._connection.manager.save(Cidade)
            .catch(err => {
            console.log(err)
            throw new Error(err)
            })
    }

    getAll(){
        return this._connection.manager.find(Cidade).catch(err => console.log(err))
    }

    getByName(nome : string){
        return this._connection.manager.find(Cidade, { cidade: nome }).catch(err => console.log(err))
    }

    getPagination(param:number){
        let index = 100 * param
        return this._connection.manager.find(Cidade, { skip: index, take:100 }).catch(err => console.log(err))
    }

    
}