import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import "../Styles/home.css";
import Simulation from "./Simulation";

export const HomePage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [editVehicle, setEditVehicle] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPositionX, setEditPositionX] = useState(0);
  const [editPositionY, setEditPositionY] = useState(0);
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

  useEffect(() => {
    fetch("http://localhost:8080/vehicle")
      .then((response) => response.json())
      .then((data) => {
        setVehicles(data);
      })
      .catch((error) => {
        console.error("Error fetching vehicle data:", error);
      });
  }, []);

  const handleEdit = (vehicle) => {
    setEditVehicle(vehicle);
    setEditName(vehicle.vehicleName);
    setEditPositionX(vehicle.positionX);
    setEditPositionY(vehicle.positionY);
  };

  const handleSave = () => {
    if (editVehicle) {
      const updatedVehicle = {
        ...editVehicle,
        vehicleName: editName,
        positionX: editPositionX,
        positionY: editPositionY,
      };

      fetch(`http://localhost:8080/vehicle/${editVehicle.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedVehicle),
      })
        .then((response) => response.json())
        .then((data) => {
          const updatedVehicles = vehicles.map((vehicle) => {
            if (vehicle.id === data.id) {
              return data;
            }
            return vehicle;
          });

          setVehicles(updatedVehicles);
          setEditVehicle(null);
        })
        .catch((error) => {
          console.error("Error updating vehicle:", error);
        });
    }
  };

  const handleCancel = () => {
    setEditVehicle(null);
  };

  const handleDelete = (vehicleId) => {
    fetch(`http://localhost:8080/vehicle/${vehicleId}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedVehicles = vehicles.filter(
          (vehicle) => vehicle.id !== vehicleId
        );
        setVehicles(updatedVehicles);
      })
      .catch((error) => {
        console.error("Error deleting vehicle:", error);
      });
  };

  return (
    <div>
      <div className="container">
        <h4>Scenario</h4>
        <select>
          {scenarios.map((scenario) => (
            <option key={scenario.id} value={scenario.id}>
              {scenario.name}
            </option>
          ))}
        </select>
        <table className="rounded-table">
          <thead>
            <tr>
              <th>Vehicle ID</th>
              <th>Vehicle Name</th>
              <th>Position X</th>
              <th>Position Y</th>
              <th>Speed</th>
              <th>Direction</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>{vehicle.id}</td>
                <td>{vehicle.vehicleName}</td>
                <td>{vehicle.positionX}</td>
                <td>{vehicle.positionY}</td>
                <td>{vehicle.speed}</td>
                <td>{vehicle.direction}</td>
                <td>
                  <MdEdit
                    fontSize={"25px"}
                    onClick={() => handleEdit(vehicle)}
                  />
                </td>
                <td>
                  <RiDeleteBin5Fill
                    fontSize={"25px"}
                    onClick={() => handleDelete(vehicle.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editVehicle && (
        <div className="edit-popup">
          <h3>Name</h3>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <h3>Position X</h3>
          <input
            type="number"
            value={editPositionX}
            onChange={(e) => setEditPositionX(Number(e.target.value))}
          />
          <h3>Position Y</h3>
          <input
            type="number"
            value={editPositionY}
            onChange={(e) => setEditPositionY(Number(e.target.value))}
          />
          <br />
          <br />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
      <div id="simulationdiv">
        <Simulation />
      </div>
    </div>
  );
};
