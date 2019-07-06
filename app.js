var hbs = require('express-handlebars');
var express = require('express');
var app = express();
var routes = require('./routes');
const handlebars = require('handlebars');
var path = require('path');
app.use('/', routes);
app.use('/pub/', express.static(path.join(__dirname, '/pub/')));
app.set('view engine', 'hbs');
handlebars.registerHelper('markdown', require('helper-markdown'));
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));

app.listen(5000);