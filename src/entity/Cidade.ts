import 'reflect-metadata'
import { Entity, PrimaryColumn, Column, JoinColumn, ManyToOne } from 'typeorm'
import { Estado } from './Estado'
@Entity()
export class Cidade {
    @PrimaryColumn()
    id:number

    @Column('text')
    cidade:string

    @ManyToOne(type => Estado, entity => entity.id)
    @JoinColumn({ name: 'estadoId' })
    estado: Estado
}
