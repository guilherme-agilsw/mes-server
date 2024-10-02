import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class MaintenanceDTO {
    identificacao: string;
    titulo: string;
    dataAbertura: Date; 
    situacao: Situacao; 
}

export enum Situacao {
    ABERTO = 'Aberto',
    EM_ANDAMENTO = 'Em Andamento',
    AGUARDANDO_PIECA = 'Aguardando Peça',
    FECHADO = 'Fechado',
    CANCELADO = 'Cancelado',
}

@Entity('maintenance')
export class MaintenanceEntity {

    @PrimaryGeneratedColumn()
    public id: number; // Chave primária gerada automaticamente

    @Column()
    identificacao: string;

    @Column()
    titulo: string; 

    @Column({ type: 'date' })
    dataAbertura: Date;

    @Column({
        type: 'enum',
        enum: Situacao,
    })
    situacao: Situacao; // Usando o enum Situacao para o campo 'situacao'

    @BeforeInsert()
    async prepareData() {
        
    }
}
