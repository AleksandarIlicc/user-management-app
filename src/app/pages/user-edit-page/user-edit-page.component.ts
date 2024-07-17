import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { UserService } from '../../services/user.service';
import { ManagedUser } from '../../model/IUser';
import { EditFormComponent } from '../../components/edit-form/edit-form/edit-form.component';
import { SingleUserResponse } from 'src/app/model/IApiResponse';

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

  userId!: string;
  submitted: boolean = false;
  isSubmitting: boolean = false;
  private destroy$ = new Subject<void>();

  user$: Observable<SingleUserResponse | undefined> = this.route.paramMap.pipe(
    switchMap((params) => {
      this.userId = params.get('userId')!;
      return this.userService.getSingleUser(this.userId);
    })
  );

  handleUserUpdate(userData: ManagedUser) {
    this.userService
      .updateUser(this.userId, userData)
      .pipe(
        tap(() => this.router.navigate(['/users/list'])),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
