import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaintenanceService } from './maintenance.service';
import { MaintenanceEntity } from 'src/model/maintenance'; // Certifique-se de ajustar o caminho da entidade

@Module({
  imports: [TypeOrmModule.forFeature([MaintenanceEntity])],
  providers: [MaintenanceService],
  exports: [MaintenanceService],
})
export class MaintenanceModule {}
