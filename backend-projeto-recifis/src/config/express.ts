import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv';

class ExpressConfig{
    private express: express.Application

    constructor(){
        this.express = express()
        this.middlewares()
    }

    public getExpress():express.Application{
        dotenv.config();
        return this.express
    }
    
    private middlewares():void{
        this.express.use(morgan('dev'))
        this.express.use(bodyParser.urlencoded({ extended: false }))
        this.express.use(bodyParser.json())
        this.express.use(cors())
        
    }
}

export default new ExpressConfig()