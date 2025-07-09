import express from 'express';
import UserRouters from './routers/user.js';
import AdminRouters from './routers/admin/admin.js';
import ArtistRouters from './routers/artists/artist.js';
import { authMiddleware } from './middlewares/auth.js';



const server = express();
const port = 3000;
server.use(express.json())

server.use('/user', UserRouters);
server.use('/admin', AdminRouters);
server.use("/artist",authMiddleware, ArtistRouters);


server.listen(port, () => {
    console.log(`está funcionando na porta: ${port}`)
});