var express = require('express');
var exphbs  = require('express-handlebars');
var port = process.env.PORT || 3000;

const indexRouter = require('./routes/indexRouter');


var app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));



app.use('/', indexRouter);


app.post('/webhooks', function (req, res){
    console.log('webkook', req.body); 
  
    res.status(200).send(req.body);
})
app.listen(port);

module.exports = app;