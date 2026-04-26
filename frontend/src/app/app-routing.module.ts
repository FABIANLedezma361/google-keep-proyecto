import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/notes',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./features/auth/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: 'notes',
    loadComponent: () =>
      import('./features/notes/notes.component').then((m) => m.NotesComponent),
  },
  {
    path: 'shared',
    loadComponent: () =>
      import('./features/shared/shared.component').then(
        (m) => m.SharedComponent,
      ),
  },
];
