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
  id: string;
  name: string;
  genre: string;
  imageURL?: string;
  imageBase64?: string;
  Songs: Song[];
  Albuns: Album[];
}

export interface Song {
  id: string;
  title: string;
  artistId: string;
  duration: string;
  imageURL?: string;
  imageBase64?: string;
}

export interface Album {
  id: string;
  title: string;
  releaseDate: string;
  imageURL?: string;
  imageBase64?: string;
  Songs: Song[];
}

enum Role {
  admin = "admin",
  user = "user",
}