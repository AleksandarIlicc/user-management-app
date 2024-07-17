import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ManagedUser } from '../model/IUser';
import { SingleUserResponse, UserResponse } from '../model/IApiResponse';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private managedUsers: ManagedUser[] = [
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

  getAllUsers(): Observable<UserResponse> {
    if (!this.managedUsers || this.managedUsers.length === 0) {
      return throwError(() => {
        return {
          success: false,
          message: "Users didn't found",
        };
      });
    } else {
      return of({
        success: true,
        message: 'Users fetch successfully',
        users: this.managedUsers,
      });
    }
  }

  getSingleUser(userId: string | null): Observable<SingleUserResponse> {
    const user = this.managedUsers.find((user) => user.id === userId);

    if (user) {
      return of({
        success: true,
        message: 'User fetch successfully',
        user: user,
      });
    } else {
      return throwError(() => {
        return {
          success: false,
          message: "User doesn't exists",
        };
      });
    }
  }

  addUser(userData: {
    name: string;
    email: string;
    type: string;
    pib?: string;
    mbr?: string;
  }): Observable<{ success: boolean; message: string; user?: ManagedUser }> {
    const existingUser = this.managedUsers.find(
      (user) => user.email === userData.email
    );

    if (existingUser) {
      return throwError(() => {
        return {
          success: false,
          message: 'User already exists',
        };
      });
    } else {
      const newUser: ManagedUser = {
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
    userData: Partial<ManagedUser>
  ): Observable<{ success: boolean; message: string; user?: ManagedUser }> {
    const userIndex = this.managedUsers.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
      const updatedUser = { ...this.managedUsers[userIndex], ...userData };
      this.managedUsers[userIndex] = updatedUser;

      return of({
        success: true,
        message: 'User updated successfully',
        user: updatedUser,
      });
    } else {
      return throwError(() => {
        return {
          success: false,
          message: 'User not found',
        };
      });
    }
  }
}
