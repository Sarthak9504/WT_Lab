package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allows all origins (same as Access-Control-Allow-Origin: *)
public class BillController {

    @GetMapping("/calculate-cost")
    public BillResponse calculateBill(@RequestParam("units") double energyUsed) {
        double totalCost = 0;

        if (energyUsed > 250) {
            totalCost += (energyUsed - 250) * 6.5;
        }

        if (energyUsed > 150) {
            double slabUnits = Math.min(energyUsed - 150, 100);
            totalCost += slabUnits * 5.2;
        }

        if (energyUsed > 50) {
            double slabUnits = Math.min(energyUsed - 50, 100);
            totalCost += slabUnits * 4.0;
        }

        totalCost += energyUsed > 50 ? 50 * 3.5 : energyUsed * 3.5;

        return new BillResponse(totalCost);
    }

    // Inner class for the response object
    static class BillResponse {
        private double cost;

        public BillResponse(double cost) {
            this.cost = cost;
        }

        public double getCost() {
            return cost;
        }

        public void setCost(double cost) {
            this.cost = cost;
        }
    }
}
