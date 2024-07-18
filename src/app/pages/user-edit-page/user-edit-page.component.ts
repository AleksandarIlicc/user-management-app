import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user.model';
import { EditFormComponent } from '../../components/edit-form/edit-form/edit-form.component';
import { UserResponse } from 'src/app/model/responses.model';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, EditFormComponent],
  templateUrl: './user-edit-page.component.html',
  styleUrls: ['./user-edit-page.component.css'],
})
export class UserEditPageComponent implements OnDestroy {
  userService: UserService = inject(UserService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  userId: string | null = null;
  private destroy$ = new Subject<void>();

  user$: Observable<UserResponse | undefined> = this.route.paramMap.pipe(
    switchMap((params) => {
      this.userId = params.get('userId');
      return this.userService.getSingleUser(this.userId);
    })
  );

  handleUserUpdate(userData: User) {
    this.userService
      .updateUser(this.userId, userData)
      .pipe(
        tap(
          (response) =>
            response.success && this.router.navigate(['/users/list'])
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
