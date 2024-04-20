/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
import { ErrorHandlerService } from '../services/error-handler.service';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let errorHandlerService: ErrorHandlerService;

  const mockErrorHandlerService = {
    handleError: jest
      .fn()
      .mockReturnValue({ status: 500, message: 'Internal Server Error' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: ErrorHandlerService,
          useValue: mockErrorHandlerService,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    errorHandlerService = module.get<ErrorHandlerService>(ErrorHandlerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const mockUsers: User[] = [
        {
          id: 1,
          fullName: 'John Doe',
          newValue: null,
          previousValue: null,
          timestamp: null,
          userName: null,
        },
      ];
      jest.spyOn(userRepository, 'find').mockResolvedValueOnce(mockUsers);

      const result = await service.getAllUsers();

      expect(result).toEqual(mockUsers);
    });

    it('should throw an error if userRepository.find throws an error', async () => {
      jest
        .spyOn(userRepository, 'find')
        .mockRejectedValueOnce(new Error('Database error'));

      await expect(service.getAllUsers()).rejects.toThrow(HttpException);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto = {
        fullName: 'John Doe',
      };
      const mockUser: User = {
        id: 1,
        fullName: 'John Doe',
        newValue: null,
        previousValue: null,
        timestamp: null,
        userName: null,
      };
      jest.spyOn(userRepository, 'save').mockResolvedValueOnce(mockUser);

      const result = await service.createUser(createUserDto);

      expect(result).toEqual('John Doe created');
    });

    it('should throw an error if userRepository.save throws an error', async () => {
      const createUserDto = { fullName: 'John Doe' };
      jest
        .spyOn(userRepository, 'save')
        .mockRejectedValueOnce(new Error('Database error'));

      await expect(service.createUser(createUserDto)).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const updateUserDto = { fullName: 'Jane Doe', userName: 'jane.doe' };
      const mockUser: User = {
        id: 1,
        fullName: 'John Doe',
        userName: 'john.doe',
        newValue: null,
        previousValue: null,
        timestamp: null,
      };
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(mockUser);
      jest.spyOn(userRepository, 'save').mockResolvedValueOnce(mockUser);

      const result = await service.updateUser(1, updateUserDto);

      expect(result).toEqual('Jane Doe updated');
    });

    it('should throw an error if user is not found', async () => {
      const updateUserDto = {
        id: 1,
        fullName: 'Jane Doe',
        userName: 'jane.doe',
      };
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.updateUser(1, updateUserDto)).rejects.toThrow(
        new NotFoundException(`Internal Server Error`),
      );
    });

    it('should throw an error if userRepository.save throws an error', async () => {
      const updateUserDto = { fullName: 'Jane Doe', userName: 'jane.doe' };
      const mockUser: User = {
        id: 1,
        fullName: 'John Doe',
        userName: 'john.doe',
        newValue: null,
        previousValue: null,
        timestamp: null,
      };
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(mockUser);
      jest
        .spyOn(userRepository, 'save')
        .mockRejectedValueOnce(new Error('Database error'));

      await expect(service.updateUser(1, updateUserDto)).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('findById', () => {
    it('should return user if found', async () => {
      const user = new User();
      user.id = 1;
      user.fullName = 'John Doe';
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(user);

      const result = await service.findById(1);
      expect(result).toEqual(user);
    });
  });
});
