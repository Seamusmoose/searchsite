import "./App.css";
import FilterPrac from "./components/FilterPrac";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import MarsRover from "./components/MarsRover";
import MarsWeather from "./components/MarsWeather";
// import NasaWeatherScrape from "./webscraping/NasaWeatherScrape";

function App() {
  const getSol = (sol) => {
    console.log(sol);
  };

  return (
    <div>
      <Layout />
      <MarsWeather />
      <MarsRover getSol={getSol} />
      <FilterPrac />
      {/* <NasaWeatherScrape /> */}

      <Footer />
    </div>
  );
}

export default App;
