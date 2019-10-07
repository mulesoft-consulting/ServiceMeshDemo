const LOCAL_URL = "http://127.0.0.1:9292/api";
const CLOUD_URL = "http://tshirt-soap-to-rest.cloudhub.io/api";
var cart = [];
var app = angular.module('tshirtApp', ['ngRoute']);


/**
 * Angular router for SPA
 **/
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "partials/home.html" })
        .when("/reserve", { templateUrl: "partials/reserve.html", controller: "ProductCtrl" })
        .when("/account", { templateUrl: "partials/account.html", controller: "AccountCtrl", activePage: "account" })
        .when("/confirmation", { templateUrl: "partials/confirmation.html", controller: "", activePage: "confirmation" })
        .otherwise("/", { templateUrl: "partials/home.html" });
}]);