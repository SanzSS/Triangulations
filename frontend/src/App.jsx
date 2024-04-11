import "@picocss/pico";
import "./App.css";
import Header from "./Header";
import Explore from "./Pages/ExploreComponents/Explore";
import Home from "./Pages/Home";
import People from "./Pages/People/People";
import Statistics from "./Pages/Statistics";
import { Routes, Route } from "react-router-dom";
import DataProvider from "./DataContext";
import Sandpit from "./Pages/SandpitComponents/Sandpit";

function App() {
  return (
      <div className="App min-h-screen">
        {/* <div className="container"> */}
        <Header />
        <main className="px-[2rem] h-[200rem]">
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<Explore />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/people" element={<People />} />
            <Route path="/sandpit" element={<Sandpit />} />
          </Routes>
        </main>
        <div>
          
        </div>
      </div>
  );
}

export default App;
