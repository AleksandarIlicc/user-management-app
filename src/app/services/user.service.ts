import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { User } from '../model/user.model';
import { UserResponse, UsersResponse } from '../model/responses.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private managedUsers: User[] = [
    {
      id: '1',
      name: 'Alice Smith',
      email: 'alice.smith@example.com',
      type: 'individual',
    },
    {
      id: '2',
      name: 'Tech Innovators',
      email: 'contact@techinnovators.com',
      type: 'company',
      pib: '789789',
      mbr: '101010',
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      type: 'individual',
    },
    {
      id: '4',
      name: 'Global Solutions',
      email: 'info@globalsolutions.com',
      type: 'company',
      pib: '234234',
      mbr: '345345',
    },
    {
      id: '5',
      name: 'Carol White',
      email: 'carol.white@example.com',
      type: 'individual',
    },
    {
      id: '6',
      name: 'Innovative Minds',
      email: 'support@innovativeminds.com',
      type: 'company',
      pib: '567567',
      mbr: '678678',
    },
    {
      id: '7',
      name: 'David Green',
      email: 'david.green@example.com',
      type: 'individual',
    },
    {
      id: '8',
      name: 'Future Enterprises',
      email: 'sales@futureenterprises.com',
      type: 'company',
      pib: '910910',
      mbr: '112112',
    },
    {
      id: '9',
      name: 'Eva Brown',
      email: 'eva.brown@example.com',
      type: 'individual',
    },
    {
      id: '10',
      name: 'NextGen Corp',
      email: 'hello@nextgencorp.com',
      type: 'company',
      pib: '131313',
      mbr: '141414',
    },
  ];

  private usersSubject = new BehaviorSubject<User[]>(this.managedUsers);

  allUsers$: Observable<UsersResponse> = this.usersSubject.asObservable().pipe(
    map((users) => ({
      success: true,
      message: 'Users fetch successfully',
      users: users,
    })),
    catchError(() => {
      return of({
        success: false,
        message: "Users didn't found",
      });
    })
  );

  getSingleUser(userId: string | null): Observable<UserResponse> {
    return this.findUserById(userId).pipe(
      map((user) => ({
        success: true,
        message: 'User fetched successfully',
        user: user,
      })),
      catchError(() => {
        return of({
          success: false,
          message: "User doesn't exist",
        });
      })
    );
  }

  addUser(userData: {
    name: string;
    email: string;
    type: string;
    pib?: string;
    mbr?: string;
  }): Observable<UsersResponse> {
    const existingUser = this.managedUsers.find(
      (user) => user.email === userData.email
    );

    if (existingUser) {
      return of({
        success: false,
        message: 'User already exists',
      });
    } else {
      const newUser: User = {
        id: (this.managedUsers.length + 1).toString(),
        ...userData,
      };
      this.managedUsers.push(newUser);

      return of({
        success: true,
        message: 'User added successfully',
        user: newUser,
      });
    }
  }

  updateUser(
    id: string | null,
    userData: Partial<User>
  ): Observable<{ success: boolean; message: string; user?: User }> {
    return this.findUserById(id).pipe(
      switchMap((currentUser) => this.updateUserData(currentUser, userData)),
      catchError((error) =>
        of({
          success: false,
          message: error.message,
        })
      )
    );
  }

  private findUserById(id: string | null): Observable<User> {
    const userIndex = this.managedUsers.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      return of(this.managedUsers[userIndex]);
    } else {
      return throwError(() => new Error('User not found'));
    }
  }

  private updateUserData(
    currentUser: User,
    userData: Partial<User>
  ): Observable<{ success: boolean; message: string; user: User }> {
    const updatedUser = { ...currentUser, ...userData };

    if (currentUser.type === 'company' && userData.type === 'individual') {
      updatedUser.pib = '';
      updatedUser.mbr = '';
    }

    const userIndex = this.managedUsers.findIndex(
      (user) => user.id === currentUser.id
    );
    this.managedUsers[userIndex] = updatedUser;

    return of({
      success: true,
      message: 'User updated successfully',
      user: updatedUser,
    });
  }
}
