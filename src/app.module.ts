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
      "host": "mysql-1fe3f0b1-testec13-d93e.e.aivencloud.com",
      "port": 11034,
      "username": "avnadmin",
      "password": "XXX",
      "database": "defaultdb",
      "entities": [__dirname + '../modules/**/*.entity{.ts,.js}'],
      "synchronize": true,
      autoLoadEntities: true
  }
  ), UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
