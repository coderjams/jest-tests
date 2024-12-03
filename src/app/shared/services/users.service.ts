import { inject, Injectable } from '@angular/core';
import { UserInteface } from '../types/user.interface';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  utilsService = inject(UtilsService);
  users: UserInteface[] = [];

  addUser(user: UserInteface): void {
    this.users = [...this.users, user];
  }

  removeUser(userId: string): void {
    const updatedUsers = this.users.filter((user) => userId !== user.id);
    this.users = updatedUsers;
  }

  getUserNames(): string[] {
    return this.utilsService.pluck(this.users, 'name');
  }
}
