'use strict';

var request = require('request');
var express = require('express');
var serveStatic = require('serve-static');
const bodyParser = require('body-parser')


var PORT = process.env.PORT || 3000;
var app = express();

app.use(serveStatic('dist', { 'index': ['index.html'] }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/customers/:id', function(req, res) {
    request.get('http://customer-service:8080/customers/1', function(error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('reqParams:', req.params);
        console.log('body:', body);
        res.end(body);
    });
});

app.post('/processPayment', function(req, res) {
    console.log('payment call made', req.body);
    debugger;
    request.post('http://payment-service:8080/processPayment', {
        body: JSON.stringify(req.body)}, function(error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('reqParams:', req.params);
        console.log('body:', body);
        res.end(body);
    });
});

app.post('/orders', function(req, res) {
    console.log('order call made');
    request.post('http://order-service:8080/orders',{
        body: JSON.stringify(req.body)}, function(error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('reqParams:', req.params);
        console.log('body:', body);
        res.end(body);
    });
});


app.listen(PORT, function() {
    console.log('Server listening on port ' + PORT);
});