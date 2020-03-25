import * as express from 'express'
import * as bodyParser from 'body-parser'
import ApplicationRoutes from '../src/routes/routes'
import * as expressValidator from 'express-validator'
import { createConnection } from 'typeorm'
import * as morgan from 'morgan'
import SwaggerApplication from '../docs'
import Logger from '../src/services/logger'

export default class App {
  private app:express;
  private static swaggerDocs = new SwaggerApplication();

  private initDb ():void{
    createConnection().then(() => {
      Logger.info('DB connection ok!')
    })
      .catch(err => {
        Logger.info(err)
      })
  }

  private setAppConfigs (app:express):void {
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(expressValidator())
    app.use(morgan('combined'))
  }

  initApp (appPort:Number = 3000):void {
    this.app = express()
    this.setAppConfigs(this.app)
    App.swaggerDocs.init(this.app)
    ApplicationRoutes(this.app)
    this.initDb()
    this.app.listen(appPort, () => {
      Logger.info(`Application running at port: ${appPort}`)
    })
  }
}
