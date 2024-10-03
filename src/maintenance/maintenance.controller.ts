import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards, Patch, Param, Delete } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { MaintenanceDTO, MaintenanceListDTO } from 'src/model/maintenance';

@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Post('create')
  create(@Body() createMaintenanceDto: MaintenanceDTO): Promise<MaintenanceDTO> {
    return this.maintenanceService.create(createMaintenanceDto);
  }

  @Get('findAll')
  findAll() : Promise<MaintenanceListDTO> {
    return this.maintenanceService.getAllMaintenance();
    //return this.maintenanceService.findAll();
  }

  @Get('countStatus')
  async getMaintenanceCountByStatus() {
      return this.maintenanceService.countMaintenanceByStatus();
  }


}
