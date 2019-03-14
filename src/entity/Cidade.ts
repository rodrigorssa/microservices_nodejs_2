import "reflect-metadata"
import {Entity, PrimaryColumn, Column, OneToOne, JoinColumn} from "typeorm";
import { Estado } from './Estado'
@Entity()
export class Cidade {

    @PrimaryColumn()
    id:number

    @Column('text')
    cidade:string

    @OneToOne(type => Estado)
    @JoinColumn()
    estado: Estado

} 