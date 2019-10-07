package com.mulesoft.demo.customer;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class CustomerApplication {

	public static void main(String[] args) {
		SpringApplication.run(CustomerApplication.class, args);
	}

	@RequestMapping("/customers")
	@CrossOrigin
    public List<Customer> getCustomers() {
		Customer customerExample1 = new Customer();
		Customer customerExample2 = new Customer();

		customerExample1.setCustomerExample1();
		customerExample2.setCustomerExample2();

		List<Customer> customerList = new ArrayList<Customer>(); 
        customerList.add(customerExample1); 
        customerList.add(customerExample2); 

        return customerList;
	}
	
	@RequestMapping("/customers/{id}")
	@CrossOrigin
	public Customer getCustomerBYId(@PathVariable String id) {
		Customer customerExample1 = new Customer();

		customerExample1.setCustomerExample1();
		return customerExample1;
	}
}
