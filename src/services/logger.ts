import { createLogger, format, transports } from 'winston'
import StringUtils from '../utils/string'

class Logger {
  private logger = createLogger({
    format: format.json(),
    defaultMeta: {
      app: 'nossas_lojas',
      pid: process.pid,
      date: new Date().toLocaleString()
    },
    transports: new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    })
  })

  info (message:any):void{
    this.logger.info(StringUtils.toString(message))
  }

  warn (message:any):void{
    this.logger.warn(StringUtils.toString(message))
  }

  error (message:any):void{
    this.logger.log({ level: 'error', message: message, trace: new Error(message).stack })
  }
}

export default new Logger()
