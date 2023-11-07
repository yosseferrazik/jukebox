import React, { useState } from "react";
import "./App.css";
import { Screen } from "./components/Screen/Screen";

const App = () => {
  const [data, setdata] = useState(0);
  const pasarId = (id) => {
    setdata(id);
  };
  function backgroundFinder(id) {
    switch (id) {
      case 0:
        return "cero";
      case 1:
        return "uno";
      case 2:
        return "dos";
      case 3:
        return "tres";
      case 4:
        return "quatro";
      case 5:
        return "cinco";
      case 6:
        return "seis";
      default:
        break;
    }
  }
  return (
    <div className={backgroundFinder(data)}>
      <div className="body">
        <div className="jukebox">
          <Screen pasarId={pasarId} />
        </div>
      </div>
    </div>
  );
};

export default App;
