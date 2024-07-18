import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserCredentials } from '../model/user.model';
import { IAuthResponse } from '../model/auth-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registeredUsers: UserCredentials[] = [
    {
      id: '1',
      email: 'jean.dupont@example.com',
      password: 'JeanDupont123!',
      name: 'Jean Dupont',
    },
    {
      id: '2',
      email: 'mario.rossi@example.com',
      password: 'MarioRossi123!',
      name: 'Mario Rossi',
    },
    {
      id: '3',
      email: 'hans.schmidt@example.com',
      password: 'HansSchmidt123!',
      name: 'Hans Schmidt',
    },
    {
      id: '4',
      email: 'emma.johnson@example.com',
      password: 'EmmaJohnson123!',
      name: 'Emma Johnson',
    },
    {
      id: '5',
      email: 'ivan.petrovic@example.com',
      password: 'IvanPetrovic123!',
      name: 'Ivan Petrović',
    },
  ];

  currentUserSubject = new BehaviorSubject<UserCredentials | null>(null);
  currentUserAction$ = this.currentUserSubject.asObservable();

  login(email: string, password: string): Observable<IAuthResponse> {
    const user = this.registeredUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      this.currentUserSubject.next(user);
      return of({ success: true, message: 'Login successful' });
    } else {
      return of({
        success: false,
        message: 'Invalid email or password',
      });
    }
  }

  register(
    name: string,
    email: string,
    password: string
  ): Observable<IAuthResponse> {
    const existingUser = this.registeredUsers.find(
      (user) => user.email === email
    );

    if (existingUser) {
      return of({
        success: false,
        message: 'User already registered',
      });
    } else {
      const newUser = {
        id: (this.registeredUsers.length + 1).toString(),
        name,
        email,
        password,
      };
      this.registeredUsers.push(newUser);
      this.currentUserSubject.next(newUser);

      return of({
        success: true,
        message: 'Registration successful',
      });
    }
  }
}
