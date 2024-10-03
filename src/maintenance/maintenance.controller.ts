import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards, Patch, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MaintenanceService } from './maintenance.service';
import { MaintenanceDTO, MaintenanceListDTO } from 'src/model/maintenance';

@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Post('create')
  @UseGuards(AuthGuard())
  create(@Body() createMaintenanceDto: MaintenanceDTO): Promise<MaintenanceDTO> {
    return this.maintenanceService.create(createMaintenanceDto);
  }

  @Get('findAll')
  @UseGuards(AuthGuard())
  findAll() : Promise<MaintenanceListDTO> {
    return this.maintenanceService.getAllMaintenance();
  }

  @Get('countStatus')
  @UseGuards(AuthGuard())
  async getMaintenanceCountByStatus() {
      return this.maintenanceService.countMaintenanceByStatus();
  }
}
