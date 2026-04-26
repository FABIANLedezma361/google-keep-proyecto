import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Note {
  id?: string;
  titulo: string;
  contenido: string;
  color?: string;
  archivada?: boolean;
  recordatorio?: Date;
  etiquetas?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private apiUrl = 'http://localhost:3000/api/notes';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getNoteById(id: string): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  createNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note, { headers: this.getHeaders() });
  }

  updateNote(id: string, note: Note): Observable<Note> {
    return this.http.patch<Note>(`${this.apiUrl}/${id}`, note, {
      headers: this.getHeaders(),
    });
  }

  deleteNote(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  archiveNote(id: string): Observable<Note> {
    return this.http.patch<Note>(
      `${this.apiUrl}/${id}/archive`,
      {},
      { headers: this.getHeaders() },
    );
  }

  unarchiveNote(id: string): Observable<Note> {
    return this.http.patch<Note>(
      `${this.apiUrl}/${id}/unarchive`,
      {},
      { headers: this.getHeaders() },
    );
  }
}
