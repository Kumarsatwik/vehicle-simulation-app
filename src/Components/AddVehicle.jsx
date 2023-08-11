import React, { useState, useEffect } from "react";
import "../Styles/Addvehicle.css";
import { Link } from "react-router-dom";

export const AddVehicle = () => {
  const [vehicleName, setVehicleName] = useState("");
  const [speed, setSpeed] = useState("");
  const [positionX, setPositionX] = useState("");
  const [positionY, setPositionY] = useState("");
  const [direction, setDirection] = useState("");
  const [scenarios, setScenarios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/scenarios")
      .then((response) => response.json())
      .then((data) => {
        setScenarios(data);
      })
      .catch((error) => {
        console.error("Error fetching scenarios:", error);
      });
  }, []);

  const handleAddClick = () => {
    if (!vehicleName || !speed || !positionX || !positionY || !direction) {
      alert("All fields are required!");
      return;
    }

    if (positionX < 0 || positionX > 800) {
      alert("Position X should be between 0 and 800!");
      return;
    }

    if (positionY < 0 || positionY > 280) {
      alert("Position Y should be between 0 and 280!");
      return;
    }

    const vehicleData = {
      vehicleName,
      speed,
      positionX,
      positionY,
      direction,
    };

    fetch("http://localhost:8080/vehicle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicleData),
    })
      .then((response) => {
        alert("Vehicle added successfully!");
      })
      .catch((error) => {
        console.error("Error adding vehicle:", error);
      });
  };

  const handleResetClick = () => {
    setVehicleName("");
    setSpeed("");
    setPositionX("");
    setPositionY("");
    setDirection("");
  };

  return (
    <>
      <div className="vehiclemain">
        <h2>Add Vehicle</h2>
      </div>
      <div className="custom-component">
        <div className="row">
          <div className="input-container">
            <h4>Scenarios List</h4>
            <select>
              <option value="option">Select Scenario</option>
              {scenarios.map((scenario) => (
                <option key={scenario.id} value={scenario.id}>
                  {scenario.name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-container">
            <h4>Vehicle Name</h4>
            <input
              type="text"
              placeholder="Target abc"
              value={vehicleName}
              onChange={(e) => setVehicleName(e.target.value)}
            />
          </div>
          <div className="input-container">
            <h4>Speed</h4>
            <input
              type="number"
              placeholder="2"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
            />
          </div>
        </div>
        <div className="row2">
          <div className="input-container">
            <h4>Position X</h4>
            <input
              className="required-field"
              placeholder="0-800"
              type="number"
              value={positionX}
              onChange={(e) => setPositionX(e.target.value)}
            />
            <p className="popup">
              X Position should not be {">"} 800 and {"<"} 0
            </p>
          </div>
          <div className="input-container">
            <h4>Position Y</h4>
            <input
              type="number"
              className="required-field"
              placeholder="0-280"
              value={positionY}
              onChange={(e) => setPositionY(e.target.value)}
            />
            <p className="popup">
              Y Position should not be {">"} 280 and {"<"} 0
            </p>
          </div>
          <div className="input-container">
            <h4>Direction</h4>
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
            >
              <option value="option">Select Direction</option>
              <option value="Toward">Toward</option>
              <hr />
              <option value="Backward">Backward</option>
              <hr />
              <option value="Upward">Upward</option>
              <hr />
              <option value="Downward">Downward</option>
              <hr />
            </select>
          </div>
        </div>

        <div className="button-section">
          <button onClick={handleAddClick}>Add</button>
          <button onClick={handleResetClick}>Reset</button>
          <Link to={"/"}>
            <button id="tbutton">Go Back</button>
          </Link>
        </div>
      </div>
    </>
  );
};
