package com.mulesoft.demo.payment;

public class PaymentResponse {

    private String id;
    private String status;

    /**
    * No args constructor for use in serialization
    *
    */
    public PaymentResponse() {
    }

    /**
    *
    * @param id
    * @param status
    */
    public PaymentResponse(String id, String status) {
        super();
        this.id = id;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setPaymentResponseExample () {
        setId ("askd-123a-ad10-19999");
        setStatus("paid");
    }
}