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

export interface JWTDecoded {
  id: string;
  name: string;
  role: Role;
  iat?: number; // issued at
  exp?: number; // expiration time
} 

enum Role {
  admin = "admin",
  user = "user",
}