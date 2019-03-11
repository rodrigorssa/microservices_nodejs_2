import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Loja  {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name: string
    
    @Column()
    address:string

    @Column()
    phone:string

    @Column()
    cnpj:string

    @Column()
    workingHour:string

    @Column()
    city:string

    @Column()
    state:string
}