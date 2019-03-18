import 'reflect-metadata'
import { Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Loja } from './Loja';

@Entity()
export class Clientes{

    @PrimaryColumn()
    cpf:number

    @ManyToOne(type => Loja, entity => entity.id)
    @JoinColumn({name: 'LojaId'})
    loja:Loja

}

