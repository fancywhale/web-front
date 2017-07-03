const Application = require('./src/Application').Application;

const app = new Application();
app.server.set('view engine', 'pug');
app.start();

