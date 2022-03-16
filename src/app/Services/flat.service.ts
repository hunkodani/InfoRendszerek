import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Housing } from '../Models/housing';

@Injectable({
  providedIn: 'root'
})
export class FlatService {

  constructor(private http: HttpClient) { }

  async loadFlats() {
    return lastValueFrom(this.http.get<Housing[]>('/api/flats'));
  }

  async createFlat(flat: Housing) {
    return lastValueFrom(this.http.post<Housing>('/api/flats', flat));
  }

  async updateFlat(flat: Housing) {
    return lastValueFrom(this.http.put<Housing>('/api/flats', flat));
  }
}
