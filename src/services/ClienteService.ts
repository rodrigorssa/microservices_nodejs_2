import { Cliente, Loja } from '../entity/index'
import Clientes from '../models/Clientes'

export class ClienteService {

    clientes = new Clientes()

    async importarClientes(){
        let count = 0;
        //gerando clientes aleatórios
        for (let index = 0; index < 20; index++) {
            let cliente = new Cliente()
                cliente.cpf = Math.floor(Math.random() * 99999999999)
                cliente.loja = new Loja()
                cliente.loja.id = (index >= 10) ? 40 : 39

            this.clientes.salva(cliente)
            count++
        }

        console.log(count+' clientes inseridos!');
        
    }
}