import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import { AddScenario } from './Components/AddScenario';
import { AddVehicle } from './Components/AddVehicle';
import { HomePage } from './Components/HomePage';
import { Sidenavbar } from './Components/Sidenavbar';
import { AllScenarios } from './Components/AllScenarios';

function App() {
  return (
    <BrowserRouter>
       <div className="App">
      <Sidenavbar />
      <div className='secondmaindiv'>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="addscenario" element={<AddScenario />} />
          <Route path="allscenarios" element={<AllScenarios />} />
          <Route path="addvehicle" element={<AddVehicle />} />
      </Routes>
      </div>
    </div>
    </BrowserRouter>
 
  );
}

export default App;

    