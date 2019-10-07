#
# Set default namespace to nto-payment
#
kubectl config set-context --current --namespace=nto-payment
#
# Deploy Order application
#
kubectl delete -f ./order/order-deployment.yaml
#
# Deploy Payment application
#
kubectl delete -f ./payment/payment-deployment.yaml
#
# Deploy Inventory application
#
kubectl delete -f ./inventory/inventory-deployment.yaml
#
# Deploy Customer application
#
kubectl delete -f ./customer/customer-deployment.yaml
