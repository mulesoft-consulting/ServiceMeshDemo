#!/bin/bash
#
#
if [ $# -eq 0 ]
then
  default="mythical-payment"
  read -p "Enter your new/existing Kubernetes namespace [default=$default]: " nsvar
  : ${nsvar:=$default}
  echo "Your new/existing Kubernetes namespace: $nsvar"

  NAMESPACE=$nsvar
else
  NAMESPACE=$1
fi

# Create the Istio adapter if it doesn’t exist:
#
kubectl get ns "$NAMESPACE" > /dev/null && {
  echo "$NAMESPACE already exists ..."
} || {
  echo "Create namespace $NAMESPACE ..."
  kubectl create namespace $NAMESPACE
  kubectl label ns $NAMESPACE istio-injection=enabled
  #kubectl create -f namespace-mythical-payment.json
}

#
# Set current namespace
#
echo "Set namespace $NAMESPACE to default ..."
kubectl config set-context --current --namespace=$NAMESPACE

#
# Deploy Service
#
echo "Deploy NTO Services ..."
kubectl apply -f mythical-deployment.yaml
