import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteCardComponent, Note } from '../../components/note-card/note-card.component';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule, NoteCardComponent],
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
})
export class NotesListComponent implements OnInit {
  notes: Note[] = [];
  loading = false;

  // Mock data por ahora
  mockNotes: Note[] = [
    {
      id: '1',
      titulo: 'Primera Nota',
      contenido: 'Este es el contenido de mi primera nota',
      tipo: 'text',
      archivada: false
    },
    {
      id: '2',
      titulo: 'Segunda Nota',
      contenido: 'Otra nota de ejemplo',
      tipo: 'text',
      etiquetas: 'trabajo, importante',
      archivada: false
    }
  ];

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.loading = true;
    // Por ahora usar mock data
    setTimeout(() => {
      this.notes = this.mockNotes;
      this.loading = false;
    }, 500);
  }

  onNoteClick(noteId: string): void {
    console.log('Note clicked:', noteId);
    // TODO: Navigate to note detail
  }

  onArchive(noteId: string): void {
    console.log('Archive note:', noteId);
    // TODO: Implement archive functionality
  }

  onDelete(noteId: string): void {
    console.log('Delete note:', noteId);
    // TODO: Implement delete functionality
  }
}
