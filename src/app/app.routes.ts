import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login-page/login-page.component').then(
        (m) => m.LoginPageComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register-page/register-page.component').then(
        (m) => m.RegisterPageComponent
      ),
  },
  {
    path: 'users/list',
    loadComponent: () =>
      import(
        './pages/observable-user-list-page/observable-user-list-page.component'
      ).then((m) => m.ObservableUserListPageComponent),
  },
  // {
  //   path: 'users/list',
  //   loadComponent: () =>
  //     import(
  //       './pages/signal-user-list-page/signal-user-list-page.component'
  //     ).then((m) => m.SignalUserListPageComponent),
  // },
  {
    path: 'users/new',
    loadComponent: () =>
      import('./pages/new-user-page/new-user-page.component').then(
        (m) => m.NewUserPageComponent
      ),
  },
  {
    path: 'users/:userId/view',
    loadComponent: () =>
      import('./pages/user-view/user-view.component').then(
        (m) => m.UserViewComponent
      ),
  },
  {
    path: 'users/:userId/edit',
    loadComponent: () =>
      import('./pages/user-edit-page/user-edit-page.component').then(
        (m) => m.UserEditPageComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
