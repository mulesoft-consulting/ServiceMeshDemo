    /**
     * Product getter / setter
     **/
    app.service('productService', function() {
        var currentProduct = {};

        var addProduct = function(newObj) {
            currentProduct = newObj;
            localStorage.setItem("currentProduct", JSON.stringify(currentProduct));
        };

        var getProduct = function() {
            if ($.isEmptyObject(currentProduct)) currentProduct = JSON.parse(localStorage.getItem('currentProduct'));
            return currentProduct
        };

        return {
            addProduct: addProduct,
            getProduct: getProduct
        };

    });

    app.service('cartService', function($http) {
        var cart = [];
        var addToCart = function(product) {

            var newItem = true;

            if (!$.isEmptyObject(cart)) {
                cart.forEach(function(prod) {
                    if (prod && prod.productCode == product.productCode) {
                        prod.quantity++;
                        newItem = false;
                    }
                })
            }

            if (newItem)
                cart.push(product);

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartNumber();
            return cart;
        }

        var removeFromCart = function(product) {

            var newCart = [];

            cart.forEach(function(prod, key) {
                if (prod.productCode == product.productCode) {
                    delete cart[key];
                } else {
                    newCart.push(prod);
                }
            })

            cart = newCart;
            localStorage.setItem("cart", JSON.stringify(newCart));
            updateCartNumber();

            return cart;
        }


        var retrieveCart = function() {
            if ($.isEmptyObject(cart)) {
                if (localStorage.getItem('cart'))
                    cart = JSON.parse(localStorage.getItem('cart'));
                else
                    cart = [];
            }
            updateCartNumber();
            return cart;
        }

        var updateCartNumber = function() {
            var number = 0;

            if (!$.isEmptyObject(cart)) {
                cart.forEach(function(prod) {
                    if (prod)
                        number += parseInt(prod.quantity);
                })
            }

            $("#lblCartCount")[0].innerHTML = number;
        }

        var emptyCart = function() {
            cart = [];
            $("#lblCartCount")[0].innerHTML = cart.length || 0;

            localStorage.removeItem('cart');
        }

        var placeOrder = function() {
            var postBody = {
                "customerId": "1",
                "status": "Draft",
                "orderItems": [{
                    "orderItemId": "1",
                    "productId": "1",
                    "location": {
                        "locationId": "1",
                        "locationType": "STORE",
                        "deliveryMethod": "PICKUP"
                    },
                    "price": "40",
                    "productName": "Supersonic Electronic",
                    "quantity": 4
                }]
            };
            var order = {};

            return $http({
                url: "/orders",
                method: "POST",
                contentType: 'application/json',
                data: JSON.stringify(postBody)
            }).then(function(resp) {
                order = {
                    id: resp.data.identifier,
                    orderStatus: resp.data.status,
                    message: resp.data.message,
                    status: resp.status
                }
                console.log('Place order call successful')
                return order;
            }, function(err) {
                order = {
                    id: "",
                    orderStatus: "",
                    status: err.status,
                    error: err.statusText,
                    message: err.data

                }
                console.log(`Place order call failed. Status: ${order.status}, Error: ${order.error}, Message: ${order.message}`);
                return order;
            })
        }

        return {
            addToCart: addToCart,
            removeFromCart: removeFromCart,
            retrieveCart: retrieveCart,
            emptyCart: emptyCart,
            placeOrder: placeOrder
        }
    })

    /**
     * Service that performs user manipulation
     **/
    app.service('userService', function($rootScope, $http) {
        var currentUser = {};

        var getUser = function(email) {
            if (currentUser.Email == email) return currentUser;
            return getUserFromSalesforce(email);
        }

        var getPayment = function() {
            return authorizePayment();
        }

        var authorizePayment = function() {
            var postBody = {
                "price": {
                    "amount": {
                        "currency": "USD",
                        "currencyValue": 34.90,
                        "name": "Amount"
                    },
                    "salesUnit": {
                        "code": "EA",
                        "name": "Each"
                    }
                },
                "customer": {
                    "paymentMethod": "BANK",
                    "orderId": "2834987-a31313-909999",
                    "customerId": "9238492-19238kjhskdja-918329"
                }
            };

            return $http({
                url: "/processPayment",
                method: "POST",
                contentType: 'application/json',
                data: JSON.stringify(postBody)
            }).then(function(resp) {
                var payment = {};
                payment = {
                    id: resp.data.id,
                    payStatus: resp.data.status,
                    status: resp.status
                }
                console.log('Get payment call successful')

                return payment;
            }, function(err) {
                payment = {
                    id: "",
                    payStatus: "",
                    status: err.status,
                    error: err.statusText,
                    message: err.data
                }
                console.log(`Get payment call failed. Status: ${payment.status}, Error: ${payment.error}, Message: ${payment.message}`);
                return payment
            })
        }

        var getUserFromSalesforce = function(email) {
            var user = {};
            return $http({
                url: "/customers/1",
                method: "GET",
                dataType: "json"
            }).then(function(resp) {
                user = {
                    id: resp.data.id,
                    name: resp.data.name,
                    email: resp.data.email,
                    phone: resp.data.phone,
                    address1: resp.data.shippingAddress.line.join(" "),
                    city: resp.data.shippingAddress.city,
                    stateOrProvince: resp.data.shippingAddress.state,
                    postalCode: resp.data.shippingAddress.postalCode,
                    country: resp.data.shippingAddress.country,
                    status: resp.status
                }
                console.log('Get User call successful')
                setCurrentUser(user);
                return user;
            }, function(err) {
                user = {
                    id: "",
                    name: "",
                    email: "",
                    phone: "",
                    address1: "",
                    city: "",
                    stateOrProvince: "",
                    postalCode: "",
                    country: "",
                    status: err.status,
                    error: err.statusText,
                    message: err.data
                }
                console.log(`Get user call failed. Status: ${user.status}, Error: ${user.error}, Message: ${user.message}`);
                setCurrentUser(user);
                return user;
            })
        }

        var setCurrentUser = function(user) {
            currentUser = user;
            $rootScope.$broadcast('user:updated', currentUser);
            localStorage.setItem("user", JSON.stringify(user));
        }

        var getCurrentUser = function() {
            return currentUser;
        }

        return {
            getUser: getUser,
            getPayment: getPayment
        }
    })

    app.service('orderService', function() {
        var retrieveOrder = function() {
            var cart = [];

            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
                localStorage.setItem("order", JSON.stringify(cart));
            } else {
                cart = JSON.parse(localStorage.getItem('order'));
            }
            return cart;
        }

        var getOrderUser = function() {
            var user = [];

            if (localStorage.getItem('user')) {
                user = JSON.parse(localStorage.getItem('user'));
            }
            return user;
        }

        return {
            retrieveOrder: retrieveOrder,
            getOrderUser: getOrderUser
        };
    })