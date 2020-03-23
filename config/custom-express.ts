import * as express from 'express'
import * as bodyParser from 'body-parser'
import routes from '../src/routes/routes'
import * as expressValidator from 'express-validator'
import * as swaggerUi from 'swagger-ui-express'
import { createConnection } from 'typeorm'
import * as morgan from 'morgan'

const swaggerDocument = require('../documentation/swagger.json')

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(expressValidator())
app.use(morgan('combined'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

createConnection().then(async () => {
    console.log('DB connection ok!');
})
.catch( err => {
  console.log(err);
  
})

routes(app)

export default app