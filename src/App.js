import "./App.css";
import FilterPrac from "./components/FilterPrac";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import MarsRover from "./components/MarsRover";
import MarsWeather from "./components/MarsWeather";

function App() {
  return (
    <div>
      <Layout />
      <MarsWeather />
      {/* <MarsRover /> */}
      <FilterPrac />
      <Footer />
    </div>
  );
}

export default App;
