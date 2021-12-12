import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./style/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientsList from "./ClientsList";
import AddClient from "./AddClient";
import Warehouse from "./Warehouse";
import AddProduct from "./AddProduct";
import OrdersList from "./OrdersList";

function App() {
  let [clients, setClientsState] = useState({ clients: [] });
  let [orders, setOrdersState] = useState({ orders: [] });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/klienci");
      const body = await response.json();
      setClientsState(body);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/zamowienia");
      const body = await response.json();
      setOrdersState(body);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/klienci" element={<ClientsList clients={clients} />} />
          <Route path="/zamowienia" element={<OrdersList orders={orders} />} />
          <Route path="/magazyn" element={<Warehouse />} />
          <Route path="/klienci/dodaj" element={<AddClient />} />
          <Route path="/magazyn/dodaj" element={<AddProduct />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
