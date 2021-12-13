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
import AddOrder from "./AddOrder";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/klienci" element={<ClientsList />} />
          <Route path="/klienci/dodaj" element={<AddClient />} />
          <Route path="/klienci/:id" element={<ClientDetails />} />

          <Route path="/pracownicy" element={<EmployeesList />} />
          <Route path="/pracownicy/dodaj" element={<AddEmployee />} />

          <Route path="/zamowienia" element={<OrdersList />} />
          <Route path="/zamowienia/dodaj" element={<AddOrder />} />
          {/* <Route 
            path="/zamowienia/:id"
            render
          /> */}

          <Route path="/magazyn" element={<Warehouse />} />
          <Route path="/magazyn/dodaj" element={<AddProduct />} />

          <Route path="/faktury" element={<InvoiceList />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
