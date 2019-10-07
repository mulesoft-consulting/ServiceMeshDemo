package com.mulesoft.demo.payment;

import java.util.HashMap;
import java.util.Map;

public class Amount {

    private String currency;
    private double currencyValue;
    private String name;

    /**
    * No args constructor for use in serialization
    *
    */
    public Amount() {
    }

    /**
    *
    * @param name
    * @param currencyValue
    * @param currency
    */
    public Amount(String currency, double currencyValue, String name) {
        super();
        this.currency = currency;
        this.currencyValue = currencyValue;
        this.name = name;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public double getCurrencyValue() {
        return currencyValue;
    }

    public void setCurrencyValue(double currencyValue) {
        this.currencyValue = currencyValue;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}