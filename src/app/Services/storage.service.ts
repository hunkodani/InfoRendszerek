import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { userRoles } from '../Models/userRoles';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  name !: string;
  role !: string;

  constructor(private http: HttpClient) { }

  async authenticateUser(username: string, passw: string) {
    let roleNum = await this.FindUser(username, passw);
    if (typeof roleNum === 'number') {
      let tmp = parseInt(roleNum);
      this.setAuthentication(username, userRoles[tmp]);
      return true;
    }
    return false;
  }

  getAuthentication() {
    let tmpName = sessionStorage.getItem('name');
    let tmpRole = sessionStorage.getItem('role');
    if (tmpName && tmpRole) {
      this.role = tmpRole;
      this.name = tmpName;
    }
  }

  setAuthentication(name: string, role: string) {
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('role', role);
  }

  deleteAuthentication() {
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('role');
  }

  async FindUser(username: string, passw: string): Promise<string | null> {
    return lastValueFrom(this.http.get<string>('/api/user', {
      params: {name: username, pass: passw}
    }));
  }
}
