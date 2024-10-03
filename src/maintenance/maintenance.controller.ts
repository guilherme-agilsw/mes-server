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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maintenanceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaintenanceDto: MaintenanceDTO) {
    return this.maintenanceService.update(+id, updateMaintenanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maintenanceService.remove(+id);
  }


}
