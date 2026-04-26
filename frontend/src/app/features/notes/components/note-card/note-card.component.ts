import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from '../../../../core/services/note.service';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent {
  @Input() note!: Note;
  @Output() noteClick = new EventEmitter<string>();
  @Output() archive = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  onNoteClick(): void {
    this.noteClick.emit(this.note.id);
  }

  onArchive(event: Event): void {
    event.stopPropagation();
    this.archive.emit(this.note.id);
  }

  onDelete(event: Event): void {
    event.stopPropagation();
    this.delete.emit(this.note.id);
  }
}
