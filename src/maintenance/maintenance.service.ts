import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MaintenanceDTO, MaintenanceEntity, MaintenanceListDTO } from 'src/model/maintenance';
import { Repository } from 'typeorm';

@Injectable()
export class MaintenanceService {
  constructor(
    @InjectRepository(MaintenanceEntity)
    private readonly maintenanceRepository: Repository<MaintenanceEntity>,
  ) {}

  async getAllMaintenance(): Promise<MaintenanceListDTO> {
    const maintenances = await this.maintenanceRepository.find();
    return {
      maintenances, // Retorne a lista de manutenções
    };
  }
  
  create(createMaintenanceDto: MaintenanceDTO) {
    return 'This action adds a new maintenance';
  }

  findAll() {
    return `This action returns all maintenance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} maintenance`;
  }

  update(id: number, updateMaintenanceDto: MaintenanceDTO) {
    return `This action updates a #${id} maintenance`;
  }

  remove(id: number) {
    return `This action removes a #${id} maintenance`;
  }
}
