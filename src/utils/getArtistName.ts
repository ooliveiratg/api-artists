
import { PrismaClient } from "../models/generated/client/index.js"

const prisma = new PrismaClient()
export const GetArtistName = async (name:string):Promise<string | undefined> => {
    try{
        const artistList = await prisma.artist.findUnique({
            where: {
                name: name
            }
            
        })

        if (!artistList) {
      return undefined;
    }

        return artistList.id
    }catch(error){
        console.log(error)
    }
}