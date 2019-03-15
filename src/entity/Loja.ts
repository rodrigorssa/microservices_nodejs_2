import "reflect-metadata"
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { Cidade, Estado } from '../entity/index'

@Entity()
export class Loja  {

    @PrimaryGeneratedColumn()
    id:number

    @Column('text')
    name:string

    @Column('text')
    address:string

    @Column('text')
    phone:string

    @Column('text')
    cnpj:string

    @Column('text')
    workingHour:string
    
    @ManyToOne(type => Cidade, entity=>entity.id)
    @JoinColumn({ name: "cidadeId" })
    cidade: Cidade;

    @ManyToOne(type => Estado, entity=>entity.id)
    @JoinColumn({ name: "estadoId" })
    estado: Estado;
}