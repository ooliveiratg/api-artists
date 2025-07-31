
import { PrismaClient } from "prisma-client-03a518d660d46599669b7d0275b51e0b633dd6f47347e8370302069037be3b05"

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