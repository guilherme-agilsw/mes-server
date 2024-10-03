import { forwardRef, Module } from '@nestjs/common';
import { MaintenanceController } from './maintenance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaintenanceService } from './maintenance.service';
import { MaintenanceEntity } from 'src/model/maintenance'; 
import { AuthModule } from '../auth/auth.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([MaintenanceEntity]),
    forwardRef(() => AuthModule), 
  ],
  
  controllers: [MaintenanceController],
  providers: [MaintenanceService],
  exports: [MaintenanceService],
})
export class MaintenanceModule {}
