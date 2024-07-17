import { Component, inject, OnDestroy } from '@angular/core';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ManagedUser } from 'src/app/model/IUser';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-new-user-page',
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  templateUrl: './new-user-page.component.html',
  styleUrl: './new-user-page.component.css',
})
export class NewUserPageComponent implements OnDestroy {
  userService: UserService = inject(UserService);
  router: Router = inject(Router);
  private destroy$ = new Subject<void>();

  constructor() {}

  handleUserCreate(userData: ManagedUser) {
    this.userService
      .addUser(userData)
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
