import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserDTO, UserEntity } from './user';

export class MaintenanceDTO {
    id: number;               
    titulo: string;          
    descricao: string;       
    tipoManutencao: string;  
    criticidade: string;     
    tecnico: UserEntity;         
    dataAbertura: Date;      
    dataFechamento: Date;    
    status: string;          
    equipamento: string;     
    localizacao: string;     
    modelo: string;          

    constructor(partial: Partial<MaintenanceDTO>) {
        Object.assign(this, partial);
    }
}

export class MaintenanceListDTO {
    maintenances: MaintenanceDTO[];
    constructor() {
        this.maintenances = [];
    }
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
    public id: number; 

    @Column()
    titulo: string; 

    @Column()
    descricao: string; 

    @Column()
    tipoManutencao: string;

    @Column()
    criticidade: string;

    @Column({ type: 'date' })
    dataAbertura: Date;

    @Column({ type: 'date' })
    dataFechamento: Date;

    @Column()
    status: string;

    @Column()
    equipamento: string;

    @Column()
    localizacao: string;

    @Column()
    modelo: string;

    @ManyToOne(() => UserEntity, (user) => user.manutenções) // Define o relacionamento ManyToOne
    tecnico: UserEntity; // Referência ao UserEntity

    @BeforeInsert()
    async prepareData() {
        
    }
}
