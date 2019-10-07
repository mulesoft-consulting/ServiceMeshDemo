package com.mulesoft.demo.order;

public class OrderResponse {

    private String status;
    private String identifier;
    private String message;

    /**
    * No args constructor for use in serialization
    *
    */
    public OrderResponse() {
    }

    /**
    *
    * @param message
    * @param status
    * @param identifier
    */
    public OrderResponse(String status, String identifier, String message) {
        super();
        this.status = status;
        this.identifier = identifier;
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setOrderResponseExample () {
        setIdentifier ("123456789");
        setStatus("created");
        setMessage("Order was created");
    }
}