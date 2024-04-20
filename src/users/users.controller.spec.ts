import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { ErrorHandlerService } from '../services/error-handler.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {}, // Mock User repository
        },
        ErrorHandlerService,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        {
          id: 1,
          fullName: 'John Doe',
          previousValue: null,
          newValue: null,
          timestamp: null,
          userName: null,
        },
      ];
      jest.spyOn(usersService, 'getAllUsers').mockResolvedValue(users);

      expect(await controller.getAllUsers()).toEqual(users);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = { fullName: 'John Doe' };
      const message = 'John Doe created';
      jest.spyOn(usersService, 'createUser').mockResolvedValue(message);

      expect(await controller.createUser(createUserDto)).toEqual(message);
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const id = 1;
      const updateUserDto: UpdateUserDto = {
        fullName: 'Jane Doe',
        userName: 'Allan G',
      };
      const message = 'Jane Doe updated';
      jest.spyOn(usersService, 'updateUser').mockResolvedValue(message);

      expect(await controller.updateUser(id, updateUserDto)).toEqual(message);
    });
  });
});
