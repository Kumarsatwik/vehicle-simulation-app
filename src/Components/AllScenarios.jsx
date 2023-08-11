import React, { useState, useEffect } from "react";
import "../Styles/Allscenarios.css";
import { Link } from "react-router-dom";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

const EditScenarioForm = ({ scenario, onSave, onCancel }) => {
  const [name, setName] = useState(scenario.name);
  const [time, setTime] = useState(scenario.time);

  const handleSave = () => {
    onSave({ ...scenario, name, time });
  };

  return (
    <div className="edit-dialog">
      <div className="edit-dialog-content">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export const AllScenarios = () => {
  const [scenarios, setScenarios] = useState([]);
  const [editingScenarioId, setEditingScenarioId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/scenarios")
      .then((response) => response.json())
      .then((data) => setScenarios(data))
      .catch((error) => console.log(error));
  }, []);

  const handleAddVehicle = (id) => {
    const scenarioIndex = scenarios.findIndex((scenario) => scenario.id === id);

    if (scenarioIndex !== -1) {
      const updatedScenario = { ...scenarios[scenarioIndex] };
      updatedScenario.vehicles++;

      const updatedScenarios = [...scenarios];
      updatedScenarios[scenarioIndex] = updatedScenario;

      setScenarios(updatedScenarios);

      const url = `http://localhost:8080/scenarios/${updatedScenario.id}`;
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedScenario),
      });
    }
  };

  const handleEditScenario = (id) => {
    setEditingScenarioId(id);
  };

  const handleCancelEdit = () => {
    setEditingScenarioId(null);
  };

  const handleSaveEdit = (updatedScenario) => {
    const updatedScenarios = scenarios.map((scenario) => {
      if (scenario.id === updatedScenario.id) {
        return updatedScenario;
      }
      return scenario;
    });
    setScenarios(updatedScenarios);
    setEditingScenarioId(null);

    const url = `http://localhost:8080/scenarios/${updatedScenario.id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedScenario),
    });
  };

  const handleDelete = (scenarioId) => {
    const updatedScenarios = scenarios.filter(
      (scenario) => scenario.id !== scenarioId
    );
    setScenarios(updatedScenarios);

    const url = `http://localhost:8080/scenarios/${scenarioId}`;
    fetch(url, {
      method: "DELETE",
    });
  };

  const handleDeleteAll = () => {
    setScenarios([]);

    const url = "http://localhost:8080/scenarios";
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("All scenarios deleted successfully.");
        } else {
          console.error("Failed to delete all scenarios.");
        }
      })
      .catch((error) => {
        console.error("Network error occurred.", error);
      });
  };
  return (
    <>
      <div id="maindiv">
        <div className="scenariomaindiv">
          <h2>All Scenarios</h2>
          <div className="buttondiv">
            <Link to="/addscenario">
              <button>New Scenario</button>
            </Link>
            <Link to="/addvehicle">
              <button id="sbtn">Add Vehicle</button>
            </Link>
            <button id="tbtn" onClick={handleDeleteAll}>
              Delete All
            </button>
          </div>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Scenario ID</th>
                <th>Scenario Name</th>
                <th>Scenario Time</th>
                <th>Number of Vehicles</th>
                <th>Add Vehicle</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {scenarios.map((scenario) => (
                <tr key={scenario.id}>
                  <td>{scenario.id}</td>
                  <td>{scenario.name}</td>
                  <td>{scenario.time}s</td>
                  <td>{scenario.vehicles}</td>
                  <td>
                    <BsFillPlusCircleFill
                      fontSize={"22px"}
                      onClick={() => handleAddVehicle(scenario.id)}
                    />
                  </td>
                  <td>
                    {editingScenarioId === scenario.id ? (
                      <EditScenarioForm
                        scenario={scenario}
                        onSave={handleSaveEdit}
                        onCancel={handleCancelEdit}
                      />
                    ) : (
                      <MdEdit
                        fontSize={"25px"}
                        onClick={() => handleEditScenario(scenario.id)}
                      />
                    )}
                  </td>
                  <td>
                    <RiDeleteBin5Fill
                      fontSize={"25px"}
                      onClick={() => handleDelete(scenario.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
