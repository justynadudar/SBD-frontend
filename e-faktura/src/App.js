import Navbar from "./Navbar";
import "./style/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientsList from "./ClientsList";
import AddClient from "./AddClient";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/klienci" element={<ClientsList />} />
          <Route path="/klienci/1" element={<AddClient />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
