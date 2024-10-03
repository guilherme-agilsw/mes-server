import { Module } from '@nestjs/common';
import { MaintenanceController } from './maintenance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaintenanceService } from './maintenance.service';
import { MaintenanceEntity } from 'src/model/maintenance'; // Certifique-se de ajustar o caminho da entidade

@Module({
  imports: [TypeOrmModule.forFeature([MaintenanceEntity])],
  
  controllers: [MaintenanceController],
  providers: [MaintenanceService],
  exports: [MaintenanceService],
})
export class MaintenanceModule {}
