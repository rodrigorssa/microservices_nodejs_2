import {LojasRouter, CidadesRouter, EstadosRouter, ClientesRouter } from './index'
export default (app) => {
       
        new LojasRouter(app)
        new CidadesRouter(app)
        new EstadosRouter(app)
        new ClientesRouter(app)

        //caso não encontre nenhuma rota
        app.use((req, res) => {
            res.status(404).json({errorCode: 404, msg: 'Pagina não encontrada!'});
        });

}