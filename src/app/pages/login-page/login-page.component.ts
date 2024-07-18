import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IAuthResponse } from 'src/app/model/auth-response.model';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  loginAction$!: Observable<IAuthResponse>;

  handleLogin(credentials: { email: string; password: string }) {
    this.loginAction$ = this.authService
      .login(credentials.email, credentials.password)
      .pipe(
        tap(
          (response) =>
            response.success && this.router.navigate(['/users/list'])
        )
      );
  }
}
