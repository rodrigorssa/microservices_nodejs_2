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


}

export default Lojas