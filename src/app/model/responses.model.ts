import { User } from './user.model';

export interface UsersResponse {
  success: boolean;
  message: string;
  users?: User[];
}

export interface UserResponse {
  success: boolean;
  message: string;
  user?: User;
}
