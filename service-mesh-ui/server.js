'use strict';

var request = require('request');
var express = require('express');

var PORT = process.env.PORT || 8085;
var app = express();

app.get('/customers/:id', function (req, res) {
	console.log("customer call made");
	request('http://customer-service:8080/customers/' + req.params.id, function (error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('reqParams:', req.params);	
        console.log('body:', body);
          res.end(body);
        });
});

app.post('/processPayment', function (req, res) {
	console.log('payment call made');
	request('http://payment-service:8080/processPayment', function (error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('reqParams:', req.params);	
        console.log('body:', body);
          res.end(body);
        });
});

app.post('/orders', function (req, res) {
	console.log('order call made');
	request('http://order-service:8080/orders', function (error, response, body) {
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