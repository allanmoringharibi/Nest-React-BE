import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { ErrorHandlerService } from '../services/error-handler.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, ErrorHandlerService],
  controllers: [UsersController],
})
export class UsersModule {}
