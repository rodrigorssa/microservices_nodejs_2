import * as swaggerUi from 'swagger-ui-express'

export default class SwaggerUI {
  private swaggerDocsJSON:JSON;

  constructor () {
    this.swaggerDocsJSON = require('./swagger.json')
  }

  init (app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(this.swaggerDocsJSON))
  }
}
