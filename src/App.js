import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Orders from "./Pages/Orders/Orders";

function App() {
  return (
    <div className="px-4">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Orders />} />
      </Routes>
    </div>
  );
}

export default App;
