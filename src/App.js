import React from "react";
import "./App.css";
import { Screen } from "./components/Screen/Screen";

const App = () => {
  return (
    <div className="body">
      <div className="jukebox">
        <Screen />
      </div>
    </div>
  );
};

export default App;
