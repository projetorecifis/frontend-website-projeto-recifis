import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'

class ExpressConfig{
    private express: express.Application

    constructor(){
        dotenv.config();
        this.express = express()
        this.middlewares()
    }

    public getExpress():express.Application{
        return this.express
    }
    
    private middlewares():void{
        this.express.use(morgan('dev'))
        this.express.use(bodyParser.urlencoded({ extended: true }))
        this.express.use(bodyParser.json())
        this.express.use(cors())
        
    }
}

export default new ExpressConfig()