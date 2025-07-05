export interface User {
  name?: string;
  email: string;
  password: string;
  id:string;
  role: Role;
}

export interface Admin {
  name?: string;
  email: string;
  password: string;
  id:string;
  role: Role;
}

enum Role {
  admin = "admin",
  user = "user",
}