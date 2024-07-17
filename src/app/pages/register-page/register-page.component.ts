import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { catchError, EMPTY, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, RegisterFormComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent implements OnDestroy {
  errorMessage: string | null = null;
  success: boolean = false;
  destroy$ = new Subject<void>();

  constructor(private authService: AuthService, private router: Router) {}

  handleRegister(credentials: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    this.authService
      .register(credentials.name, credentials.email, credentials.password)
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
