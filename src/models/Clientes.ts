import { Cliente } from '../entity/Cliente'
import { Connection, getConnection } from 'typeorm'

export default class Clientes {

    _connection:Connection

    constructor(){
        this._connection = getConnection()
    }

    salva(cliente:Cliente){
        return this._connection.manager.save(cliente).catch(err => console.log(err))
    }

    getAll(){
        return this._connection.manager.find(Cliente).catch(err => console.log(err))
    }

    getByCPF(cpf:number){
        return this._connection.manager.findOne(Cliente,{ where: { cpf }}).catch(err => console.log(err))
    }

    update(cliente:Cliente){
        return this._connection.manager.save(Cliente,cliente).catch(err => console.log(err))
    }

    delete(id:number){
        return this._connection.manager.delete(Cliente, id).catch(err => console.log(err))
    }

}