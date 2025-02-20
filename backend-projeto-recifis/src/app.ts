import { run } from './models/connection';
import ExpressConfig from './config/express';
import userRouter from './routes/user.routes';

class App{
    private app = ExpressConfig.getExpress();
    private port = process.env.PORT;

    public getListen():void{
        this.listen();
        this.routes()
    }

    private async listen(): Promise<void>{
        await this.app.listen(this.port, () => {
            console.log('Server was started at port:', this.port);
        })

        await this.connection();
    }

    private async connection(): Promise<void>{
        await run().catch(console.dir);
    }
    private routes(): void{
        this.app.use('/user', userRouter)
        // this.app.use('/games', gamesRouter)
    }
}

const app = new App()
app.getListen()