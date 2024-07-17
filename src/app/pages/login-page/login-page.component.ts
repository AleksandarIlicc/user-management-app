import { Component, inject, OnDestroy } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { catchError, EMPTY, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent implements OnDestroy {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  errorMessage: string | null = null;
  success: boolean = false;
  destroy$ = new Subject<void>();

  handleLogin(credentials: { email: string; password: string }) {
    this.authService
      .login(credentials.email, credentials.password)
      .pipe(
        tap(() => this.router.navigate(['/users/list'])),
        catchError((err) => {
          this.errorMessage = err.message;
          return EMPTY;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
