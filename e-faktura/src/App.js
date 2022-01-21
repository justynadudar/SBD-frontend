import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./style/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientsList from "./Clients/ClientsList";
import AddClient from "./Clients/AddClient";
import ProductsList from "./Products/ProductsList";
import AddProduct from "./Products/AddProduct";
import OrdersList from "./Orders/OrdersList";
import AddOrder from "./Orders/AddOrder";
import InvoiceList from "./Invoices/InvoiceList";
import ClientDetails from "./Clients/ClientDetails";
import EmployeesList from "./Employees/EmployeesList";
import AddEmployee from "./Employees/AddEmployee";
import ProducersList from "./Producers/ProducersList";
import AddProducer from "./Producers/AddProducer";
import PositionsList from "./Invoices/PositionsList";
import EditProduct from "./Products/EditProduct";
import InvoiceOrderList from "./Invoices/InvoiceOrderList";
import LogoProxy from "./LogoProxy";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LogoProxy />} />
          <Route path="/klienci" element={<ClientsList />} />
          <Route path="/klienci/dodaj" element={<AddClient />} />
          <Route path="/klienci/:id" element={<ClientDetails />} />

          <Route path="/pracownicy" element={<EmployeesList />} />
          <Route path="/pracownicy/dodaj" element={<AddEmployee />} />

          <Route path="/zamowienia" element={<OrdersList />} />
          <Route path="/pozycje/zamowienie/:id" element={<PositionsList />} />
          <Route path="/zamowienia/dodaj" element={<AddOrder />} />

          <Route path="/magazyn" element={<ProductsList />} />
          <Route path="/magazyn/dodaj" element={<AddProduct />} />
          <Route path="/magazyn/edytuj" element={<EditProduct />} />

          <Route path="/faktury" element={<InvoiceList />} />
          <Route
            path="/faktury/zamowienia/:id"
            element={<InvoiceOrderList />}
          />

          <Route path="/producenci" element={<ProducersList />} />
          <Route path="/producenci/dodaj" element={<AddProducer />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
