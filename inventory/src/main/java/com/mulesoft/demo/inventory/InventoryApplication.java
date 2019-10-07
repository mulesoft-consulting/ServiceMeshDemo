package com.mulesoft.demo.inventory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class InventoryApplication {

	public static void main(String[] args) {
		SpringApplication.run(InventoryApplication.class, args);
	}

	@RequestMapping (value = "/reservation", method = RequestMethod.POST)
	@CrossOrigin
	public InventoryResponse reservation () {
		InventoryResponse inventoryResponseExample = new InventoryResponse();

		inventoryResponseExample.setInventoryResponseExample();

		return inventoryResponseExample;
	}
}
