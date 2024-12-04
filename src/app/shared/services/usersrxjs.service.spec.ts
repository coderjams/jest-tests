import { TestBed } from '@angular/core/testing';
import { UsersrxjsService } from './usersrxjs.service';
import { UserInteface } from '../types/user.interface';
import { UtilsService } from './utils.service';

describe('UserService', () => {
  let usersrxjsService: UsersrxjsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersrxjsService],
    });

    usersrxjsService = TestBed.inject(UsersrxjsService);
  });

  it('should be created', () => {
    expect(usersrxjsService).toBeTruthy();
  });

  describe('addUser', () => {
    it('should add a user', () => {
      const user: UserInteface = { id: '3', name: 'foo' };
      usersrxjsService.addUser(user);
      expect(usersrxjsService.users$.getValue()).toEqual([
        { id: '3', name: 'foo' },
      ]);
    });

    it;
  });

  describe('removeUser', () => {
    it('should remove a user', () => {
      usersrxjsService.users$.next([
        { id: '3', name: 'foo' },
        { id: '4', name: 'bar' },
      ]);
      usersrxjsService.removeUser('3');

      expect(usersrxjsService.users$.getValue()).toEqual([
        { id: '4', name: 'bar' },
      ]);
    });
  });
});
