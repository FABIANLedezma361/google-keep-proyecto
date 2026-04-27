import { Routes } from '@angular/router';

export const routes: Routes = [
  //  Redirección inicial
  {
    path: '',
    redirectTo: 'notes',
    pathMatch: 'full',
  },

  //  Auth
  {
    path: 'auth',
    loadComponent: () =>
      import('./features/auth/auth.component').then(
        (m) => m.AuthComponent
      ),
  },

  //  Notes (estructura profesional con children)
  {
    path: 'notes',
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './features/notes/pages/notes-list/notes-list.component'
          ).then((m) => m.NotesListComponent),
      },
      {
        path: ':id',
        loadComponent: () =>
          import(
            './features/notes/pages/note-detail/note-detail.component'
          ).then((m) => m.NoteDetailComponent),
      },
    ],
  },

  //  Notas compartidas
  {
    path: 'shared',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/shared/shared.component').then(
            (m) => m.SharedComponent
          ),
      },
      {
        path: ':id',
        loadComponent: () =>
          import(
            './features/notes/pages/note-detail/note-detail.component'
          ).then((m) => m.NoteDetailComponent),
      },
    ],
  },

  //  Ruta no encontrada (opcional pero recomendado)
  {
    path: '**',
    redirectTo: 'notes',
  },
];