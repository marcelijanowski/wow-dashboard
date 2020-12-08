import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import { authRouter } from './api/auth/router.js';
import { reportRouter } from './api/report/router.js';

const { parsed }  = dotenv.config();
const app = express();
const port = 3000;
import handlebars from 'express-handlebars';

const envVariables = ['CLIENT_SECRET','WOW_AUTH', 'WOW_HOST', 'WOW_SERVICE_STATUS'];
const results = envVariables.filter(configVar => parsed[configVar].length );
if (envVariables.length !== results.length) {
  throw Error(`Please setup a environment variables to be able to run application. Please provide ${envVariables.join(',')}`)
}

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
  layoutsDir: './frontend/views/layouts',
  defaultLayout: 'main',
  partialsDir  : [
    './frontend/views/layouts'
  ],
  extname: 'hbs'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/api/auth', authRouter());
app.use('/api/report', reportRouter());
app.get('/', (req, res) => {
  res.render('../frontend/views/main', {layout : 'index'});
});
app.use((error, response) => {
  return response.status(500)
    .json({
      message: 'Some error occurred.'
    })
});
app.listen(port, () => console.log(`App listening to port ${port}`));
