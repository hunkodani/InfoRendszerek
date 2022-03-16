import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Person } from '../Models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  async loadPeople() {
    return lastValueFrom(this.http.get<Person[]>('/api/people'));
  }

  async filterPeople(search: string) {
    return lastValueFrom(this.http.get<Person[]>('/api/people', {
      params: { search }
    }));
  }

  async createPerson(person: Person) {
    return lastValueFrom(this.http.post<Person>('/api/people', person));
  }

  async updatePerson(person: Person) {
    return lastValueFrom(this.http.put<Person>('/api/people', person));
  }
}
