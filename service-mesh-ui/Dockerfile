FROM node:6

# Add Maintainer Info
LABEL maintainer="dennis.foley@mulesoft.com"

WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app

# Make port 3000 available to the world outside this container
EXPOSE 3000

RUN npm install -g gulp

VOLUME ["/app"]
CMD ["gulp", "bundle", "-c", "http://customer-service:8080", "-o", "http://order-service:8080", "-p", "http://payment-service:8080"]
