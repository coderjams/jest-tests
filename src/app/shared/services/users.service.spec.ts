import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { UserInteface } from '../types/user.interface';
import { UtilsService } from './utils.service';

describe('UserService', () => {
  let usersService: UsersService;

  // when we are not mocking utils service
  let utilsService: UtilsService;

  // for mocking utils service
  // const utilsServiceMock = {
  //   pluck: jest.fn(),
  // };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersService,
        // calling directly no mocking utils service alt to mocking its called spy
        UtilsService,

        // for mocking utils service
        // { provide: UtilsService, useValue: utilsServiceMock },
      ],
    });
    usersService = TestBed.inject(UsersService);
    // when we are injecting utils service directly
    utilsService = TestBed.inject(UtilsService);
  });
  it('should be created', () => {
    expect(usersService).toBeTruthy();
  });

  describe('addUser', () => {
    it('should add a user', () => {
      const user: UserInteface = { id: '3', name: 'foo' };
      usersService.addUser(user);
      expect(usersService.users).toEqual([{ id: '3', name: 'foo' }]);
    });

    it;
  });

  describe('removeUser', () => {
    it('should remove a user', () => {
      usersService.users = [
        { id: '3', name: 'foo' },
        { id: '4', name: 'bar' },
      ];
      usersService.removeUser('3');

      expect(usersService.users).toEqual([{ id: '4', name: 'bar' }]);
    });
  });

  describe('getUserNames', () => {
    it('should return user names', () => {
      // when we are not mocking utils service use like below
      jest.spyOn(usersService.utilsService, 'pluck');
      usersService.users = [{ id: '3', name: 'foo' }];
      usersService.getUserNames();
      expect(utilsService.pluck).toHaveBeenCalledWith(
        usersService.users,
        'name'
      );

      // if you are going to mock the value use like below
      // utilsServiceMock.pluck.mockReturnValue(['foo']);
      // expect(usersService.getUserNames()).toEqual(['foo']);
    });
  });
});
