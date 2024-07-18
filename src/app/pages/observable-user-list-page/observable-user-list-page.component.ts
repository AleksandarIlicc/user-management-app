import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ObservableUserListComponent } from '../../components/observable-user-list/observable-user-list.component';
import { UserService } from '../../services/user.service';
import { UsersResponse } from 'src/app/model/responses.model';
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

  users$: Observable<UsersResponse> = this.userService.allUsers$;

  currentUser$: Observable<string | undefined> =
    this.authService.currentUserAction$.pipe(map((user) => user?.name));
}
