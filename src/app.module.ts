import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(
    {
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "root",
      "password": "123456abc",
      "database": "photos",
      "entities": [__dirname + '../modules/**/*.entity{.ts,.js}'],
      "synchronize": true,
      autoLoadEntities: true
  }
  ), UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
