#!/bin/bash
#
#
NAMESPACE=nto-payment
# Create the Istio adapter if it doesn’t exist:
#
if kubectl get namespace | grep -q '$NAMESPACE'; then
  echo "$NAMESPACE already exists ..."
else
  echo "Create namespace $NAMESPACE ..."
  kubectl create -f namespace-nto-payment.json
fi

#
# Set current namespace
#
echo "Set namespace $NAMESPACE to default ..."
kubectl config set-context --current --namespace=$NAMESPACE

#
# Deploy Service
#
echo "Deploy NTO Services ..."
kubectl apply -f nto-deployment.yaml
