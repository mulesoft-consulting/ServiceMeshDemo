package com.mulesoft.demo.customer;

public class Customer {

    private String id;
    private String name;
    private String email;
    private String phone;
    private Address billingAddress;
    private Address shippingAddress;

    /**
    * No args constructor for use in serialization
    *
    */
    public Customer() {
    }

    /**
    *
    * @param id
    * @param phone
    * @param email
    * @param name
    * @param billingAddress
    * @param shippingAddress
    */
    public Customer(String id, String name, String email, String phone, Address billingAddress, Address shippingAddress) {
        super();
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.billingAddress = billingAddress;
        this.shippingAddress = shippingAddress;
        }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Address getBillingAddress() {
        return billingAddress;
    }

    public void setBillingAddress(Address billingAddress) {
        this.billingAddress = billingAddress;
    }

    public Address getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(Address shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public void setCustomerExample1 () {
        Address addressExample;

        setId("1");
        setName("Michelle Ruiz");
        setEmail("mruiz0@qq.com");
        setPhone("1-(951)768-8479");

        addressExample = new Address();
        addressExample.setAddressExample1();
        setBillingAddress(addressExample);

        addressExample = new Address();
        addressExample.setAddressExample2();        
        setShippingAddress(addressExample);
    }

    public void setCustomerExample2 () {
        Address addressExample;

        setId("2");
        setName("Jeremy Adams");
        setEmail("jadams1@instagram.com");
        setPhone("1-(216)797-9178");

        addressExample = new Address();
        addressExample.setAddressExample3();
        setBillingAddress(addressExample);

        addressExample = new Address();
        addressExample.setAddressExample4();        
        setShippingAddress(addressExample);
    }
}