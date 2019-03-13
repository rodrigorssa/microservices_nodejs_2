import * as express from 'express'
import * as bodyParser from 'body-parser'
import routes from '../src/routes/routes'
import * as expressValidator from 'express-validator'
import * as swaggerUi from 'swagger-ui-express'
import * as expressJWT from 'express-jwt'
import * as dotenv from 'dotenv'

//importado variaveis de ambiente
dotenv.config()

const swaggerDocument = require('../documentation/swagger.json')

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(expressValidator())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(expressJWT({ secret : process.env.KEY }).unless({ path: ['/login']}))

routes(app)

export default app