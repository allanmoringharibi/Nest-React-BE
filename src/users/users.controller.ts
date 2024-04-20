import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  UsersResponse,
  UsersService,
} from './users.service';
import { UpdateInterceptor } from '../interceptors/update.interceptor';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers(): Promise<UsersResponse> {
    return this.usersService.getAllUsers();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<string> {
    return this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  @UseInterceptors(UpdateInterceptor)
  updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<string> {
    return this.usersService.updateUser(id, updateUserDto);
  }
}
