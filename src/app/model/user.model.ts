export interface User {
  id: string;
  name: string;
  email: string;
  type: string;
  pib?: string;
  mbr?: string;
}

export interface UserCredentials {
  id: string;
  email: string;
  password: string;
  name: string;
}
