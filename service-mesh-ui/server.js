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
    // request.get('http://40.112.60.136:8080/customers/1', function(error, response, body) {
    request.get('http://customer-service:8080/customers/1', function(error, response, body) {
        // console.log('error:', error);
        // console.log('statusCode:', response && response.statusCode);
        // console.log('reqParams:', req.params);
        // console.log('body:', body);
        res.status(response.statusCode).send(body);
    });
});

app.post('/processPayment', function(req, res) {
    // request.post('http://52.170.188.7:8080/processPayment', {
    request.post('http://payment-service:8080/processPayment', {
        body: JSON.stringify(req.body)}, function(error, response, body) {
        // console.log('error:', error);
        // console.log('statusCode:', response && response.statusCode);
        // console.log('reqParams:', req.params);
        // console.log('body:', body);
        res.status(response.statusCode).send(body);
    });
});

app.post('/orders', function(req, res) {
    // request.post('http://168.62.48.212:8080/orders',{
    request.post('http://order-service:8080/orders',{
        body: JSON.stringify(req.body)}, function(error, response, body) {
        // console.log('error:', error);
        // console.log('statusCode:', response && response.statusCode);
        // console.log('reqParams:', req.params);
        // console.log('body:', body);
        res.status(response.statusCode).send(body);
    });
});

app.listen(PORT, function() {
    console.log('Server listening on port ' + PORT);
});