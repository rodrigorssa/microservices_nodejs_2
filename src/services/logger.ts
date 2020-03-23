import { createLogger, format, transports } from 'winston'
import StringUtils from '../utils/string'

class Logger {
  private logger = createLogger({
    format: format.json(),
    defaultMeta: {
      app: 'nossas_lojas'
    },
    transports: new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    })
  })

  info (message:string):void{
    this.logger.info(StringUtils.toString(message))
  }

  error (message:string):void{
    this.logger.error(StringUtils.toString(message))
  }
}

export default new Logger()
