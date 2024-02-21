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
    <DataProvider>
      <div className="App min-h-[100vh]">
        {/* <div className="container"> */}
        <Header />
        <main className="px-[2rem] ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/people" element={<People />} />
            <Route path="/sandpit" element={<Sandpit />} />
          </Routes>
        </main>
      </div>
    </DataProvider>
  );
}

export default App;
