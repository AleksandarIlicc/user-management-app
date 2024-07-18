import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { AuthService } from '../../services/auth.service';
import { IAuthResponse } from 'src/app/model/auth-response.model';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, RegisterFormComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  registerAction$!: Observable<IAuthResponse>;

  handleRegister(credentials: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    this.registerAction$ = this.authService
      .register(credentials.name, credentials.email, credentials.password)
      .pipe(
        tap(
          (response) =>
            response.success && this.router.navigate(['/users/list'])
        )
      );
  }
}
