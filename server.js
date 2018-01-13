require('zone.js/dist/zone-node');
require('reflect-metadata');
const express = require('express');
const fs = require('fs');

const { platformServer, renderModuleFactory } = require('@angular/platform-server');
const { ngExpressEngine } = require('@nguniversal/express-engine');

const { AppServerModuleNgFactory } = require('./dist-server/main.bundle');

const app = express();
const PORT = 8080;
const baseUrl = `http://localhost:${PORT}`;

// setting the view engine for express to use:
app.engine('html', ngExpressEngine({
	bootstrap: AppServerModuleNgFactory
}))

// application settings to be used with express:
app.set('view engine', 'html');
app.set('views', './');

app.use('/', express.static('./', { index: false }));


app.get('*', (req, res) => {
	res.render('index', { req, res });
});

app.listen(PORT, () => {
	console.log(`app listening on port: ${PORT}`);
})