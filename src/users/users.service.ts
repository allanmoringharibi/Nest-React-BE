import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { ErrorHandlerService } from '../services/error-handler.service';

export class CreateUserDto {
  fullName: string;
}

export class UpdateUserDto {
  fullName: string;
  userName: string;
}

export interface UsersResponse {
  results: User[];
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  async getAllUsers(): Promise<UsersResponse> {
    try {
      const users = await this.userRepository.find({});
      return { results: users };
    } catch (error) {
      const { status, message } = this.errorHandlerService.handleError(error);
      throw new HttpException({ message }, status);
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<string> {
    try {
      const { fullName } = createUserDto;

      // Check if fullName is provided and not an empty string
      if (!fullName || fullName.trim() === '') {
        throw new HttpException(
          'Full name is required',
          HttpStatus.BAD_REQUEST,
        );
      }
      const user = new User();
      user.fullName = fullName;
      await this.userRepository.save(user);
      return `${fullName} created`;
    } catch (error) {
      const { status, message } = this.errorHandlerService.handleError(error);
      throw new HttpException({ message }, status);
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<string> {
    try {
      const { fullName, userName } = updateUserDto;
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      user.fullName = fullName;
      user.userName = userName;
      await this.userRepository.save(user);
      return `${fullName} updated`;
    } catch (error) {
      const { status, message } = this.errorHandlerService.handleError(error);
      throw new HttpException({ message }, status);
    }
  }

  async findById(id: number): Promise<User | undefined> {
    try {
      return await this.userRepository.findOne({ where: { id } });
    } catch (error) {
      const { status, message } = this.errorHandlerService.handleError(error);
      throw new HttpException({ message }, status);
    }
  }

  async updateUserFields(
    id: number,
    updateUserFields: Partial<User>,
  ): Promise<void> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      await this.userRepository.update(id, updateUserFields);
    } catch (error) {
      const { status, message } = this.errorHandlerService.handleError(error);
      throw new HttpException({ message }, status);
    }
  }
}
