import { z } from "zod";


export const User = z.object( {
  name: z.string().min(1, "Nome muito curto").max(50, "Nome muito longo").optional(),
  email: z.email(),
  password: z.string().min(7, "Senha muito curta"),
  id: z.string(),
  role: z.enum(["admin", "user"]).default("user"),
})

export const Admin = z.object({
  name: z.string().min(1, "Nome muito curto").max(50, "Nome muito longo").optional(),
  email: z.email(),
  password: z.string().min(7, "Senha muito curta"),
  id:z.string(),
  role: z.enum(["admin", "user"]).default("admin"),
})

export interface JWTDecoded {
  id: string;
  name: string;
  role: Role;
  iat?: number; // issued at
  exp?: number; // expiration time
}

export const Song = z.object({
  id: z.string(),
  title: z.string().min(1, "Título muito curto"),
  duration: z.string().min(1, "Duração inválida"),
  albumId: z.string().optional(),
  artistId: z.string(),
  artistName: z.string(),
  imageURL: z.string().optional(),
  imageBase64: z.string().optional(),
})

export const Album = z.object({
    id: z.string(),
    title: z.string().min(1, "Título muito curto"),
    artistId: z.string(),
    artistName: z.string(),
    releaseDate: z.string().optional(),
    imageURL: z.string().optional(),
    imageBase64: z.string().optional(),
    Songs: z.array(Song),
})

export const Artist = z.object({
  id: z.string(),
  name: z.string().min(1, "Nome muito curto"),
  genre: z.string(),
  imageURL:z.string().optional(),
  imageBase64: z.string().optional(),
  Songs: z.array(Song),
  Albums: z.array(Album),
  biography: z.string().optional(),
})





enum Role {
  admin = "admin",
  user = "user",
}