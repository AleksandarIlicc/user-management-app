import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Observable, of, switchMap } from 'rxjs';
import { UserResponse } from 'src/app/model/responses.model';

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

  user$: Observable<UserResponse | undefined> = this.route.paramMap.pipe(
    switchMap((params) => {
      this.userId = params.get('userId');
      if (this.userId) {
        return this.userService.getSingleUser(this.userId);
      } else {
        return of(undefined);
      }
    })
  );
}
