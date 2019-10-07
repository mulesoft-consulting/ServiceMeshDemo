package com.mulesoft.demo.inventory;

public class InventoryResponse {

    private String message;

    /**
    * No args constructor for use in serialization
    *
    */
    public InventoryResponse() {
    }

    /**
    *
    * @param message
    */
    public InventoryResponse(String message) {
      super();
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setInventoryResponseExample () {
        setMessage("Product was reserved");
    }
}