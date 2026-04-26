import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../../../core/services/note.service';
import { Note } from '../../../../core/services/note.service';

@Component({
  selector: 'app-note-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss'],
})
export class NoteDetailComponent implements OnInit {
  note?: Note;
  loading = false;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService,
  ) {}

  ngOnInit(): void {
    const noteId = this.route.snapshot.paramMap.get('id');
    if (noteId) {
      this.loadNote(noteId);
    } else {
      this.router.navigate(['/notes']);
    }
  }

  loadNote(id: string): void {
    this.loading = true;
    this.noteService.getNoteById(id).subscribe({
      next: (note) => {
        this.note = note;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading note:', error);
        this.error = true;
        this.loading = false;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/notes']);
  }
}
