import { User } from './user.model';

export interface IAuthResponse {
  success: boolean;
  message: string;
  user?: User;
}
