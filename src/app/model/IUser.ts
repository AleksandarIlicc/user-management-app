export interface RegisteredUser {
  id: string;
  email: string;
  password: string;
  name: string;
}

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  type: string;
  pib?: string;
  mbr?: string;
}
