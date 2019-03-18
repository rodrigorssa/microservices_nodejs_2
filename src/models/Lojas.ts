import {getConnection, Connection} from "typeorm";
import { Loja} from '../entity/index'

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
    
    buscaLojas(obj?:any){
        //verificando se existe algum indice dentro do retorno
        //let Params = (Object.keys(params).length) ? `estado.sigla = '${params.estado}' AND cidade.cidade = '${params.cidade}'` : ''
        let query = ''

        if(Object.keys(obj.params).length){
            query = `estado.sigla = '${obj.params.estado}' AND cidade.cidade = '${obj.params.cidade}'`
        }else if(Object.keys(obj.body).length){
            let cidades = obj.body.map((e:string) => `'${e}'`)
            query =`cidade.cidade IN(${cidades})`
        }
        
        return this._connection.getRepository(Loja).createQueryBuilder("loja")
        .innerJoinAndSelect("loja.estado", "estado")
        .innerJoinAndSelect("loja.cidade", "cidade")
        .where(query)
        .getMany().catch(err => console.log(err))
    }

    buscaPorId(id:number){
        return this._connection.manager.findOne(Loja,{
            relations: ["cidade", "estado"],
            where: { id }
        }).catch(err => console.log(err))
    }

    buscaPorEstado(sigla:string){
        return this._connection.getRepository(Loja).createQueryBuilder("loja")
<<<<<<< HEAD
        .innerJoin("loja.estado", "estado")
=======
        .innerJoinAndSelect("loja.estado", "estado")
        .innerJoinAndSelect("loja.cidade", "cidade")
>>>>>>> master
        .where("estado.sigla = :estado", { estado: sigla })
        .getMany().catch(err => console.log(err))
    }

    atualiza(query:Loja){
        return this._connection.manager.save(Loja, query)
            .then(loja => loja)
            .catch(err => console.log(err))
    }

    deletar(id:number){
        return this._connection.manager.delete(Loja, id)
            .then(ret => ret)
            .catch(err => console.log(err))
    }
}

export default Lojas