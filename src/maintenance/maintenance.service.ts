import { Injectable } from '@nestjs/common';
import { MaintenanceDTO } from 'src/model/maintenance';

@Injectable()
export class MaintenanceService {
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
