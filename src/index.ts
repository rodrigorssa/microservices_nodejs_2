import app from '../config/custom-express'
import { APP_PORT } from '../config/env_vars'

app.listen(APP_PORT, () => console.log(`app funcionando na porta ${APP_PORT}!`))
