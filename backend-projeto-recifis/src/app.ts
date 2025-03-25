import Connection from './models/connection';
import ExpressConfig from './config/express';
import userRouter from './routes/user.routes';
import newsRouter from './routes/news.routes';
import cloudinary from './config/cloudinary';
import lecturesRouter from './routes/lectures.routes';
import podcastsRouter from './routes/podcasts.routes';
class App{
    private app = ExpressConfig.getExpress();
    private port = process.env.PORT;

    public getListen():void{
        this.listen();
        this.routes();
    }

    private async listen(): Promise<void>{
        this.app.listen(this.port, () => {
            console.log('Server was started at port:', this.port);
        })

        await this.connection();
        cloudinary.config();
    }

    private async connection(): Promise<void>{
        const connection = new Connection();
        await connection.run().catch(console.dir);
    }
    private routes(): void{
        this.app.use('/user', userRouter)
        this.app.use('/news', newsRouter)
        this.app.use('/lectures', lecturesRouter)
        this.app.use('/podcasts', podcastsRouter)
    }
}

const app = new App()
app.getListen()
