import 'reflect-metadata'
import { Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Loja } from './Loja';

@Entity()
export class Cliente{

    @PrimaryColumn('bigint')
    cpf:number

    @ManyToOne(type => Loja, loja => loja.id)
    @JoinColumn({name: 'lojaId'})
    loja:Loja

}

