import App from '../config/custom-express'
import { APP_PORT } from '../config/env_vars'

new App().initApp(APP_PORT)
