import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from 'src/model/user';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService] 
})
export class UsersModule {}
