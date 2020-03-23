import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class Estado {
    @PrimaryColumn()
    id:number

    @Column()
    sigla: string

    @Column('text')
    nome: string
}
