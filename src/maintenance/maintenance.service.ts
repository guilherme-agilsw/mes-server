import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MaintenanceDTO, MaintenanceEntity, MaintenanceListDTO } from 'src/model/maintenance';
import { toPromise } from 'src/model/utils';
import { Repository } from 'typeorm';

@Injectable()
export class MaintenanceService {
  constructor(
    @InjectRepository(MaintenanceEntity)
    private readonly maintenanceRepository: Repository<MaintenanceEntity>,
  ) {}

  async getAllMaintenance(): Promise<MaintenanceListDTO> {
    const list: MaintenanceListDTO = new MaintenanceListDTO();        
    const result: MaintenanceEntity[] = await this.maintenanceRepository
        .createQueryBuilder("maintenance")
        .leftJoinAndSelect("maintenance.tecnico", "user")
        .getMany();
   
    result.forEach(element => {
        list.maintenances.push(new MaintenanceDTO(element));
    });
    return list; 
}
  
  async create(createMaintenanceDto: MaintenanceDTO): Promise<MaintenanceDTO>{ 
    const maintenance = new MaintenanceEntity();
        
        maintenance.titulo = createMaintenanceDto.titulo;
        maintenance.descricao = createMaintenanceDto.descricao;
        maintenance.tipoManutencao = createMaintenanceDto.tipoManutencao;
        maintenance.criticidade = createMaintenanceDto.criticidade;
        maintenance.tecnico = createMaintenanceDto.tecnico;
        maintenance.dataAbertura = createMaintenanceDto.dataAbertura;
        maintenance.dataFechamento = createMaintenanceDto.dataFechamento;
        maintenance.status = createMaintenanceDto.status;
        maintenance.equipamento = createMaintenanceDto.equipamento;
        maintenance.localizacao = createMaintenanceDto.localizacao;
        maintenance.modelo = createMaintenanceDto.modelo;

        const savedMaintenance = await this.maintenanceRepository.save(maintenance);

        return new MaintenanceDTO(savedMaintenance);
  }   

  async countMaintenanceByStatus(): Promise<{ status: string; count: number }[]> {
    const result = await this.maintenanceRepository
        .createQueryBuilder('maintenance')
        .select('maintenance.status AS status')
        .addSelect('COUNT(maintenance.id) AS count')
        .groupBy('maintenance.status')
        .getRawMany();

    return result.map(row => ({
        status: row.status,
        count: Number(row.count), 
    }));
}
}
