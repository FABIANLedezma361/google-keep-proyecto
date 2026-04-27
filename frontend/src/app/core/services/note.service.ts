import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Note {
  id?: string;
  titulo: string;
  contenido: string;
  tipo?: string;
  etiquetas?: string;
  checklist?: any;
  recordatorio?: Date;
  archivada?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private http: HttpClient) {}

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>('/api/notes');
  }

  createNote(data: any): Observable<Note> {
    return this.http.post<Note>('/api/notes', data);
  }

  getNoteById(id: string): Observable<Note> {
    return this.http.get<Note>(`/api/notes/${id}`);
  }
}
