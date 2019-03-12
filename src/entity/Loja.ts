import "reflect-metadata"
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

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

    @Column('text')
    city:string

    @Column('text')
    state:string
}