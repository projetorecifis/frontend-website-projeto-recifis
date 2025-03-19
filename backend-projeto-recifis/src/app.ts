import Connection from './models/connection';
import ExpressConfig from './config/express';
import userRouter from './routes/user.routes';
import contentRouter from './routes/content.routes';
import dotenv from 'dotenv';
import cloudinary from './config/cloudinary';
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
        this.app.use('/content', contentRouter)
    }
}

const app = new App()
app.getListen()
