/**
 * Get list of products, populate Product List view
 **/
app.controller('ProductListCtrl', function($scope, $http, cartService) {
    $scope.products = [
        /*{
                    "productCode": "4102",
                    "size": "L",
                    "description": "Imperial Mule",
                    "count": "2",
                    "quantity": "1",
                    "imgUrl": "https://cdn.shopify.com/s/files/1/1003/3202/products/imperial_mule_grey_1024x1024.jpg",
                    "msrp": "22.99",
                    "countryOfOrigin": "China",
                    "addlDesc": "The unisex T-shirt everyone will be wearing this season. In an extra-soft and luxurious cotton-linen blend, fits loosely through the body for an on-trend look. Features a classic crew neck and an undone asymmetrical hem."
                },*/
        {
            "productCode": "1412",
            "size": "L",
            "description": "Mule Ears",
            "count": "2",
            "quantity": "1",
            "imgUrl": "https://cdn.shopify.com/s/files/1/1003/3202/products/mulehead_1024x1024.jpg",
            "msrp": "23.99",
            "countryOfOrigin": "India",
            "addlDesc": "The most flattering long-sleeved top on every body type, the tshirt is a comfortable wool-blend that fits to the body in all the right places. In a blue that goes with everything."
        },
        {
            "productCode": "5656",
            "size": "L",
            "description": "Good Things",
            "count": "2",
            "quantity": "1",
            "imgUrl": "https://cdn.shopify.com/s/files/1/1003/3202/products/all_good_things_1024x1024.jpg",
            "msrp": "24.99",
            "countryOfOrigin": "Cambodia",
            "addlDesc": "A knit tee featuring a crew neck, short sleeves, and an embroidered chest Mulesoft graphic."
        },
        {
            "productCode": "5657",
            "size": "L",
            "description": "Blue Logo Shirt",
            "count": "2",
            "quantity": "1",
            "imgUrl": "https://cdn.shopify.com/s/files/1/1003/3202/products/M_light_bluye_1024x1024.jpg",
            "msrp": "25.99",
            "countryOfOrigin": "Vietnam",
            "addlDesc": "A marled knit tee featuring a round neckline, long sleeves, a chest patch pocket, and a curved hem."
        },
        {
            "productCode": "1411",
            "size": "L",
            "description": "Active Shirt",
            "count": "2",
            "quantity": "1",
            "imgUrl": "https://cdn.shopify.com/s/files/1/1003/3202/products/front_large.jpg",
            "msrp": "26.99",
            "countryOfOrigin": "Sri Lanka",
            "addlDesc": "A heathered knit tee featuring a crew neck and short sleeves."
        }
    ]


    // $scope.itemsInCart = cartService.retrieveCart();
});

app.controller('CartListCtrl', function($scope, $http, cartService) {
    $scope.itemsInCart = cartService.retrieveCart();

    $scope.calculateTotal = function() {
        var total = 0;

        $scope.itemsInCart.forEach(function(obj) {
            total += parseFloat(obj.msrp)*parseInt(obj.quantity);
        });

        $scope.total = total.toFixed(2);
    }

    $scope.calculateTotal();

    $scope.placeOrder = function() {
        cartService.placeOrder()
            .then((order) => {
                $scope.orderStatus = order.status == 200 ? true : false;
                if ($scope.orderStatus) {
                    setTimeout(function() {
                        window.location.href = "#/confirmation";
                    }, 1000);

                }
            })

    }
});

/**
 * Expose route for navbar current page CSS 
 **/
app.controller('NavCtrl', function($scope, $route) {
    $scope.$route = $route;
})

/**
 * Initializes product and keeps track of last product viewed
 **/
app.controller('ProductCtrl', function($scope, productService, cartService) {

    $scope.init = function(object) {

        $scope.count = object.count;
        $scope.description = object.description;
        $scope.size = object.size;
        $scope.productCode = object.productCode;
        $scope.imgUrl = object.imgUrl;
        $scope.msrp = object.msrp;
        $scope.quantity = object.quantity;
        $scope.countryOfOrigin = object.countryOfOrigin;
        $scope.addlDesc = object.addlDesc;
    }
    $scope.addProduct = function(product) {
        productService.addProduct(product);
    }

    $scope.getProduct = function() {
        $scope.init(productService.getProduct());
    }

    cartService.retrieveCart();
});

app.controller('CartCtrl', function($scope, cartService) {

    $scope.init = function(object) {
        $scope.count = object.count;
        $scope.description = object.description;
        $scope.size = object.size;
        $scope.productCode = object.productCode;
        $scope.imgUrl = object.imgUrl;
        $scope.msrp = object.msrp;
        $scope.quantity = object.quantity;
        $scope.countryOfOrigin = object.countryOfOrigin;
        $scope.addlDesc = object.addlDesc;
    }

    $scope.removeFromCart = function(object) {
        $scope.init(cartService.removeFromCart(object));
        $scope.init(cartService.retrieveCart());
        $scope.calculateTotal();
    }
})

/**
 * Initializes PDP, allows user to reserve
 * Listens for user updated broadcast to update form with user info
 **/
app.controller('ReserveCtrl', function($scope, $http, cartService, productService) {
    var product = productService.getProduct();

    $scope.submit = function() {
        cartService.addToCart(product);

        $cart = cartService.retrieveCart();
        var qty = 0;

        if (!$.isEmptyObject(cart)) {
            $cart.forEach(function(prod) {
                if (prod && prod.productCode == product.productCode) {
                    qty = prod.quantity;
                }
            })
        }

        $("#addedProdImg").attr("src", product.imgUrl);
        $("#addedProdDesc").text(product.description);
        $("#addedProdPrice").text(product.msrp);
        $("#addedProdQty span").text(qty || product.quantity);
        $("#addedToCart").addClass("show");

        setTimeout(function() {
            $("#addedToCart").removeClass("show");
        }, 3000);

        window.onhashchange = function() {
            $("#addedToCart").removeClass("show");
        }
    }
});


/**
 * Create, edit, retrieve user accounts
 **/
app.controller('AccountCtrl', function($scope, userService, orderService) {

    // $("#email").keydown(function() {
    //     $scope.$apply(function() {
    //         $scope.guMessage = "";
    //     });
    // });

    $("#editBtn").click(function() {
        $("#account-info form input").removeAttr('disabled');
        $("#account-info form input")[0].focus();
        $("#editBtn").hide();
        $("#updateBtn").show();
    });

    // $("#retrieveAct, #createAct").click(function() {
    //     $scope.$apply(function() {
    //         $scope.crMessage = "";
    //         $scope.guMessage = "";
    //     });
    // });

    $("#edit-email-link").click(function() {
        // $scope.$apply(function() {
        //     $scope.crMessage = "";
        //     $scope.guMessage = "";
        // });
        $("#retrieve-form").show();
        $("#edit-email").hide();
        $("#edit-account").hide();
        $("#account-info").hide();
        $("#payment-info").hide();
        $("#edit-payment").hide();
        $("#place-order-wrapper").hide();
        $(".step").show();
    })

    $("#edit-account-link").click(function() {
        $("#edit-account").hide();
        $("#account-info").show();
        $(".step").show();
    })

    $("#edit-account-save").click(function() {
        $("#edit-account").show();
        $("#account-info").hide();
    })

    $("#edit-payment-link").click(function() {
        $("#edit-payment").hide();
        $("#payment-info").show();
        $("#place-order-wrapper").hide();
        $(".step").show();
    })


    var user = userService.getUser();
    $scope.email = "mruiz0@qq.com";


    $scope.getUser = function(user) {


        $("#getEmail").prop("disabled", true);
        if (user && user.email) {
            userService.getUser(user.email.toLowerCase())
                .then((user) => {
                    if (user && user.id && user.status == 200) {
                        $("#retrieve-form").hide();
                        $("#edit-email").show();
                        $("#edit-account").show();
                        $("#payment-info").show();
                    }
                });
        }
        $("#getEmail").prop("disabled", false);
    }

    $scope.authorizePayment = function(card) {
        $("#verifyPayment").prop("disabled", true);
        $scope.invalid = false;

        if (card && card.name && card.number && card.month && card.year && card.cvv) {
            userService.getPayment(card.name, card.number, card.month, card.year, card.cvv)
                .then((payment) => {
                    $scope.payStatus = payment.status == 200 ? true : false;

                    if ($scope.payStatus) {
                        $("#payment-info").hide();
                        $("#edit-payment").show();
                        $("#edit-account").css("opacity", 1);
                        $("#edit-email").css("opacity", 1);
                        $("#place-order-wrapper").show();
                        $(".step").hide();

                        var num = card.number;
                        num = num.toString();
                        num = num.substr(num.length - 4);
                        $scope.cardNumLast4 = num;
                    }

                })
        } else {
            $scope.invalid = true;
        }
        $("#verifyPayment").prop("disabled", false);
    }

    $scope.$on('user:updated', function(event, user) {
        $scope.name = user.name;
        $scope.address = user.address1;
        $scope.city = user.city;
        $scope.state = user.stateOrProvince;
        $scope.zip = user.postalCode;
        $scope.country = user.country;
        $scope.email = user.email;
        $scope.status = user.status == 200 ? true : false;
        $scope.phone = user.phone;
    });

});

app.controller('OrderCtrl', function($scope, $http, orderService, userService) {
    window.scrollTo(0, 0);
    $scope.itemsInOrder = orderService.retrieveOrder();
    user = orderService.getOrderUser();

    $scope.date = new Date().toJSON().slice(0, 10).replace(/-/g, '/');;

    $scope.name = user.name;
    $scope.address = user.address1;
    $scope.city = user.city;
    $scope.state = user.stateOrProvince;
    $scope.zip = user.postalCode;
    $scope.country = user.country;
    $scope.email = user.email;

    var total = 0;

    $scope.itemsInOrder.forEach(function(obj) {
        total += parseFloat(obj.msrp)*parseInt(obj.quantity);
    });

    $scope.total = total.toFixed(2);
});

app.controller('OrderCartCtrl', function($scope, cartService, orderService) {
    $scope.init = function(object) {
        $scope.count = object.count;
        $scope.description = object.description;
        $scope.size = object.size;
        $scope.productCode = object.productCode;
        $scope.imgUrl = object.imgUrl;
        $scope.msrp = object.msrp;
        $scope.quantity = object.quantity;
        $scope.countryOfOrigin = object.countryOfOrigin;
        $scope.addlDesc = object.addlDesc;
    }

    cartService.emptyCart();
});