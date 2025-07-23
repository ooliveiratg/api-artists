import express from 'express';
import UserRouters from './routers/user.js';
import AdminRouters from './routers/admin/admin.js';
import ArtistRouters from './routers/artists/artist.js';
import SongsRouter from './routers/artists/songs/song.js';
import AlbunsRouter from './routers/artists/albuns/album.js'

import { authMiddleware } from './middlewares/auth.js';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import {Request, Response, NextFunction} from 'express'

const server = express();


const port = 3000;
server.use(express.json())

server.use('/user', UserRouters);
server.use('/admin', AdminRouters);
server.use("/artist",authMiddleware, SongsRouter || ArtistRouters || AlbunsRouter );


//desta maneira ele detecta as mudanças no arquivo swagger.yaml
server.use('/api-docs',swaggerUi.serve,(req: Request, res: Response, next: NextFunction) => {
    const swaggerDocument = YAML.load('./swagger.yaml');
    swaggerUi.setup(swaggerDocument)(req, res, next);
});

server.listen(port, () => {
    console.log(`está funcionando na porta: ${port}`)
});