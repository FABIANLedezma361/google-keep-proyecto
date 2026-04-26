import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export enum SharePermission {
  READ = 'READ',
  WRITE = 'WRITE',
}

export interface NoteShare {
  id: string;
  noteId: string;
  sharedWithId: string;
  permission: SharePermission;
  sharedAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  private apiUrl = 'http://localhost:3000/api/shares';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  shareNote(
    noteId: string,
    userEmail: string,
    permission: SharePermission,
  ): Observable<NoteShare> {
    return this.http.post<NoteShare>(
      `${this.apiUrl}/share`,
      { noteId, userEmail, permission },
      { headers: this.getHeaders() },
    );
  }

  getSharedNotes(): Observable<NoteShare[]> {
    return this.http.get<NoteShare[]>(`${this.apiUrl}/shared-with-me`, {
      headers: this.getHeaders(),
    });
  }

  updateSharePermission(
    shareId: string,
    permission: SharePermission,
  ): Observable<NoteShare> {
    return this.http.patch<NoteShare>(
      `${this.apiUrl}/${shareId}`,
      { permission },
      { headers: this.getHeaders() },
    );
  }

  unshareNote(shareId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${shareId}`, {
      headers: this.getHeaders(),
    });
  }
}
