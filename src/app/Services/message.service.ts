import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  title!: string;

  newTitle(title: string) {
    this.title = title;
  }

  constructor() { }
}
