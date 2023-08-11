import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Addscenario.css";

export const AddScenario = () => {
  const initialFormData = {
    id: new Date(),
    name: "",
    time: "",
    vehicles: 0,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddScenario = () => {
    if (
      formData.name.trim() === "" ||
      formData.time.trim() === "" ||
      formData.vehicles === ""
    ) {
      alert("Fields are required");
      return;
    }

    fetch("http://localhost:8080/scenarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        time: formData.time,
        vehicles: parseInt(formData.vehicles),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Scenario added successfully:", data);
      })
      .catch((error) => {
        console.error("Error adding scenario:", error);
      });
  };

  const handleReset = () => {
    setFormData(initialFormData);
  };

  return (
    <div className="mainDiv">
      <h2>Add Scenario</h2>
      <div className="subDiv">
        <div>
          <h4>Scenario Name</h4>
          <input
            type="text"
            placeholder="ScenarioName"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <h4>Scenario Time (seconds)</h4>
          <input
            type="Number"
            className="required-field"
            placeholder="5"
            required
            name="time"
            value={formData.time}
            onChange={handleInputChange}
          />
          <p className="popup">Scenario is required</p>
        </div>
      </div>
      <div className="button-section">
        <button onClick={handleAddScenario}>Add Scenario</button>
        <button onClick={handleReset}>Reset Scenario</button>
        <Link to={"/"}>
          <button id="back-button">Back To Home</button>
        </Link>
      </div>
    </div>
  );
};
