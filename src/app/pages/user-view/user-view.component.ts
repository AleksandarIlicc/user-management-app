import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { catchError, EMPTY, Observable, of, switchMap } from 'rxjs';
import { SingleUserResponse } from 'src/app/model/IApiResponse';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css',
})
export class UserViewComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  userService: UserService = inject(UserService);
  userId: string | null = null;
  errorMessage: string = '';

  user$: Observable<SingleUserResponse | undefined> = this.route.paramMap.pipe(
    switchMap((params) => {
      this.userId = params.get('userId');
      if (this.userId) {
        return this.userService.getSingleUser(this.userId).pipe(
          catchError((err) => {
            this.errorMessage = err.message;
            return EMPTY;
          })
        );
      } else {
        return of(undefined);
      }
    })
  );
}
