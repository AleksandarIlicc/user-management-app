import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { ObservableUserListComponent } from '../../components/observable-user-list/observable-user-list.component';
import { UserService } from '../../services/user.service';
import { UserResponse } from 'src/app/model/IApiResponse';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-observable-user-list-page',
  standalone: true,
  imports: [CommonModule, ObservableUserListComponent, RouterModule],
  templateUrl: './observable-user-list-page.component.html',
  styleUrl: './observable-user-list-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObservableUserListPageComponent {
  userService: UserService = inject(UserService);
  authService: AuthService = inject(AuthService);
  errorMessage: string = '';

  users$: Observable<UserResponse> = this.userService.getAllUsers().pipe(
    catchError((error) => {
      this.errorMessage = error.message;
      return EMPTY;
    }),
    tap((data) => {
      console.log('Data received:', data);
    })
  );

  currentUser$: Observable<string | undefined> =
    this.authService.currentUserAction$.pipe(map((user) => user?.name));

  constructor() {}
}
