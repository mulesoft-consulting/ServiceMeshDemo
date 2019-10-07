// Update and remove comment for Development
// var CUSTOMER_URL = "http://52.168.30.92:8080";
// var PAYMENT_URL = "http://40.114.70.224:8080";
// var ORDER_URL = "http://52.224.219.48:8080";
var cart = [];
var app = angular.module('tshirtApp', ['ngRoute']);


/**
 * Angular router for SPA
 **/
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "../partials/home.html" })
        .when("/reserve", { templateUrl: "../partials/reserve.html", controller: "ProductCtrl" })
        .when("/account", { templateUrl: "../partials/account.html", controller: "AccountCtrl", activePage: "account" })
        .when("/confirmation", { templateUrl: "../partials/confirmation.html", controller: "", activePage: "confirmation" })
        .otherwise("/", { templateUrl: "../partials/home.html" });
}]);