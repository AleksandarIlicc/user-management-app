import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of, throwError } from 'rxjs';
import { RegisteredUser } from '../model/IUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registeredUsers: RegisteredUser[] = [
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

  currentUserSubject = new BehaviorSubject<RegisteredUser | null>(null);
  currentUserAction$ = this.currentUserSubject.asObservable();

  constructor() {}

  login(
    email: string,
    password: string
  ): Observable<{ success: boolean; message: string; user?: any }> {
    const user = this.registeredUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      this.currentUserSubject.next(user);

      return of({ success: true, message: 'Login successful' }).pipe(
        delay(1000)
      );
    } else {
      return throwError(() => {
        return { success: false, message: 'Invalid email or password' };
      }).pipe(delay(1000));
    }
  }

  register(
    name: string,
    email: string,
    password: string
  ): Observable<{ success: boolean; message: string; user?: RegisteredUser }> {
    const existingUser = this.registeredUsers.find(
      (user) => user.email === email
    );

    if (existingUser) {
      return throwError(() => {
        return {
          success: false,
          message: 'User already registered',
        };
      }).pipe(delay(1000));
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
      }).pipe(delay(1000));
    }
  }
}
