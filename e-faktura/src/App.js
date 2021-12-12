import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./style/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientsList from "./ClientsList";
import AddClient from "./AddClient";
import Warehouse from "./Warehouse";
import AddProduct from "./AddProduct";
import OrdersList from "./OrdersList";
import InvoiceList from "./InvoiceList";
import ClientDetails from "./ClientDetails";
import EmployeesList from "./EmployeesList";
import AddEmployee from "./AddEmployee";

function App() {
  let [clients, setClientsState] = useState({ clients: [] });
  let [orders, setOrdersState] = useState({ orders: [] });
  let [employees, setEmployeesState] = useState({ employees: [] });

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

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/pracownicy");
      const body = await response.json();
      setEmployeesState(body);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/klienci" element={<ClientsList clients={clients} />} />
          <Route path="/klienci/:id" element={<ClientDetails />} />
          <Route path="/klienci/dodaj" element={<AddClient />} />
          <Route
            path="/pracownicy"
            element={<EmployeesList employees={employees} />}
          />
          <Route path="/zamowienia" element={<OrdersList orders={orders} />} />
          {/* <Route 
            path="/zamowienia/:id"
            render
          /> */}
          <Route path="/magazyn" element={<Warehouse />} />
          <Route path="/faktury" element={<InvoiceList />} />
          <Route path="/klienci/dodaj" element={<AddClient />} />
          <Route path="/pracownicy/dodaj" element={<AddEmployee />} />
          <Route path="/magazyn/dodaj" element={<AddProduct />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
