import "./App.css";
import Map from "./components/Map/Map";
import jss from "jss";
import preset from "jss-preset-default";

// One time setup with default plugins and settings.
jss.setup(preset());

function App() {
  return (
    <div className="App">
      <Map />
    </div>
  );
}

export default App;
