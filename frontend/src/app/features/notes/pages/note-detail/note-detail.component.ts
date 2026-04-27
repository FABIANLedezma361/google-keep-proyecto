import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from '../../components/note-card/note-card.component';

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
    // Mock data por ahora
    setTimeout(() => {
      this.note = {
        id: id,
        titulo: 'Nota de Ejemplo',
        contenido: 'Este es el contenido detallado de la nota',
        tipo: 'text',
        etiquetas: 'ejemplo, prueba',
        archivada: false
      };
      this.loading = false;
    }, 500);
  }

  goBack(): void {
    this.router.navigate(['/notes']);
  }
}
