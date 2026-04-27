import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private http: HttpClient) {}

  getNotes() {
    return this.http.get('/api/notes');
  }

  createNote(data: any) {
    return this.http.post('/api/notes', data);
  }
}
