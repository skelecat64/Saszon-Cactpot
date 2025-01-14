import { useState } from "react";
import Solver from "./components/Solver";
import TrustworthinessDisplay from "./components/TrustworthinessDisplay";

import "./App.scss";

const App = () => {
  const [reassuranceNeeded, setReassuranceNeeded] = useState(false);

  return (
    <div className="app">
      <Solver />
      {reassuranceNeeded ? (
        <TrustworthinessDisplay />
      ) : (
        <span
          className="reassurance"
          onClick={() => setReassuranceNeeded(true)}
        >
          Need reassurance?
        </span>
      )}
    </div>
  );
};

export default App;
