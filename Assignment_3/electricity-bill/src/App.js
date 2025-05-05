import React, { useState } from "react";
import axios from "axios";

function App() {
  const [kWh, setKWh] = useState("");
  const [totalCharge, setTotalCharge] = useState(null);

  const fetchCharge = async () => {
    if (!kWh || isNaN(kWh) || kWh < 0) {
      setTotalCharge(null);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:4444/calculate-cost?units=${kWh}`
      );
      setTotalCharge(response.data.cost.toFixed(2));
    } catch (err) {
      setTotalCharge(null);
    }
  };

  return (
    <div className="container mt-5 p-4 rounded shadow" style={{ backgroundColor: "#e0f7fa" }}>
      <h1 className="text-center mb-4" style={{ color: "#00796b" }}>
        Power Usage Estimator
      </h1>

      <div className="mb-3">
        <label htmlFor="kWhInput" className="form-label" style={{ color: "#004d40" }}>
          Enter Energy Consumed (kWh):
        </label>
        <input
          type="number"
          className="form-control"
          id="kWhInput"
          value={kWh}
          onChange={(e) => setKWh(e.target.value)}
          style={{ borderColor: "#00796b" }}
        />
      </div>

      <button
        className="btn"
        onClick={fetchCharge}
        style={{ backgroundColor: "#00796b", color: "#ffffff" }}
      >
        Estimate Charge
      </button>

      {totalCharge !== null && (
        <div className="alert mt-4" style={{ backgroundColor: "#a7ffeb", color: "#004d40" }}>
          <strong>Estimated Bill:</strong> ₹{totalCharge}
        </div>
      )}
    </div>
  );
}

export default App;
