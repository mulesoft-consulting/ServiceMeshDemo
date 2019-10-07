package com.mulesoft.demo.payment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class PaymentApplication {

	public static void main(String[] args) {
		SpringApplication.run(PaymentApplication.class, args);
	}

	@RequestMapping (value = "/processPayment", method = RequestMethod.POST)
	@CrossOrigin
	public PaymentResponse processPayment () {
		PaymentResponse paymentResponseExample = new PaymentResponse();

		paymentResponseExample.setPaymentResponseExample();

		return paymentResponseExample;
	}
}
