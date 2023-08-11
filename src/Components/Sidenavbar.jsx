import React from "react";
import "../Styles/Sidenavbar.css";
import { Link } from "react-router-dom";

export const Sidenavbar = () => {
  return (
    <div className="maindiv">
      <Link to="/">
        <h2>Home</h2>
      </Link>
      <Link to="/addscenario">
        <h2>Add Scenario</h2>
      </Link>
      <Link to="/allscenarios">
        <h2>All Scenarios</h2>
      </Link>
      <Link to="/addvehicle">
        <h2>Add Vehicle</h2>
      </Link>
    </div>
  );
};
