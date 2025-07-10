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

export interface Artist{
  id: String;
  name: String;
  genre: String;
  imageURL?: String;
  imageBase64?: String;
  Songs: Song[];
  Albuns: Album[];
}

interface Song {
  id: String;
  title: String;
  duration: String;
  imageURL?: String;
  imageBase64?: String;
}

interface Album {
  id: String;
  title: String;
  releaseDate: String;
  imageURL?: String;
  imageBase64?: String;
  Songs: Song[];
}

enum Role {
  admin = "admin",
  user = "user",
}