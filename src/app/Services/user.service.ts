import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  async loadUsers() {
    return lastValueFrom(this.http.get<User[]>('/api/users'));
  }

  async FindUser(username: string, passw: string): Promise<string | null> {
    return lastValueFrom(this.http.get<string>('/api/user', {
      params: {name: username, pass: passw}
    }));
  }

  async createUser(person: User) {
    return lastValueFrom(this.http.post<User>('/api/users', person));
  }

  async deleteUser(id: number) {
    return lastValueFrom(this.http.delete(`/api/users/${id}`));
  }
}
