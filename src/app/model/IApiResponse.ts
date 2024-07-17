import { ManagedUser } from './IUser';

export interface UserResponse {
  success: boolean;
  message: string;
  users: ManagedUser[];
}

export interface SingleUserResponse {
  success: boolean;
  message: string;
  user?: ManagedUser;
}
