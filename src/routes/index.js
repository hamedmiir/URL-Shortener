import apiv1Router from './apiv1'

module.exports = (app) => {
    app.use('/apiv1/', apiv1Router);
};