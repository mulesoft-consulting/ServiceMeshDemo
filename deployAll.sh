#
# Set default namespace to nto-payment
#
kubectl config set-context --current --namespace=nto-payment
#
# Deploy Order application
#
kubectl apply -f ./order/order-deployment.yaml
#
# Deploy Payment application
#
kubectl apply -f ./payment/payment-deployment.yaml
#
# Deploy Inventory application
#
kubectl apply -f ./inventory/inventory-deployment.yaml
#
# Deploy Customer application
#
kubectl apply -f ./customer/customer-deployment.yaml
