package com.mulesoft.demo.customer;

import java.util.ArrayList;
import java.util.List;

public class Address {

    private List<String> line = null;
    private String city;
    private String state;
    private String postalCode;
    private String country;

    /**
    * No args constructor for use in serialization
    *
    */
    public Address() {
    }

    /**
    *
    * @param postalCode
    * @param state
    * @param line
    * @param country
    * @param city
    */
    public Address(List<String> line, String city, String state, String postalCode, String country) {
        super();
        this.line = line;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
        this.country = country;
    }

    public List<String> getLine() {
        return line;
    }

    public void setLine(List<String> line) {
        this.line = line;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setAddressExample1 () {
        setCity("Riverside");
        setState("California");
        setPostalCode("92501");
        setCountry("USA");
        List<String> lineExample = new ArrayList<String>(); 
        lineExample.add("Eastlawn 42"); 
        setLine(lineExample);
    }

    public void setAddressExample2 () {
        setCity("Houston");
        setState("Texas");
        setPostalCode("77045");
        setCountry("USA");
        List<String> lineExample = new ArrayList<String>(); 
        lineExample.add("South"); 
        lineExample.add("07"); 
        setLine(lineExample);
    }

    public void setAddressExample3 () {
        setCity("Cleveland");
        setState("Ohio");
        setPostalCode("44191");
        setCountry("USA");
        List<String> lineExample = new ArrayList<String>(); 
        lineExample.add("Eastwood 442"); 
        setLine(lineExample);
    }

    public void setAddressExample4 () {
        setCity("South Bend");
        setState("Indiana");
        setPostalCode("46614");
        setCountry("USA");
        List<String> lineExample = new ArrayList<String>(); 
        lineExample.add("Menomonie 5"); 
        setLine(lineExample);
    }
}