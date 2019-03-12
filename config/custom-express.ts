import * as express from 'express'
import * as bodyParser from 'body-parser'
import routes from '../src/routes/routes'
import * as expressValidator from 'express-validator'
import * as swaggerUi from 'swagger-ui-express'

const swaggerDocument = require('../documentation/swagger.json')

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(expressValidator())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

routes(app)

export default app