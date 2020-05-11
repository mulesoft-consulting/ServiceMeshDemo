#
# Test for each endpoint against services running in mythical-payment namespace
#
echo "****"
echo "**** Customer APIs"
echo "****"
echo curl --request GET http://52.168.30.92:8080/customers
curl --request GET http://52.168.30.92:8080/customers
echo
echo curl --request GET http://52.168.30.92:8080/customers/1
curl --request GET http://52.168.30.92:8080/customers/1
echo
echo "****"
echo "**** Inventory APIs"
echo "****"
echo curl --request POST http://52.168.127.200:8080/reservation
curl --request POST http://52.168.127.200:8080/reservation
echo
echo "****"
echo "**** Order APIs"
echo "****"
echo curl --request POST http://52.224.219.48:8080/orders
curl --request POST http://52.224.219.48:8080/orders
echo
echo "****"
echo "**** Payments API's"
echo "****"
echo curl --request POST http://40.114.70.224:8080/processPayment
curl --request POST http://40.114.70.224:8080/processPayment
echo
