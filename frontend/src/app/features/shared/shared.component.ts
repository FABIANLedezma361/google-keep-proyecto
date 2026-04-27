import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shared',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="shared-container">
      <h2>Notas Compartidas</h2>
      <p>Aquí verás las notas que otros usuarios han compartido contigo</p>
    </div>
  `,
  styles: [`
    .shared-container {
      padding: 2rem;
    }
  `]
})
export class SharedComponent {}
