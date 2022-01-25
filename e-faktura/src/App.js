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
import HomePage from "./HomePage";

function App({
  addClient,
  addEmployee,
  addProducer,
  addProduct,
  getClients,
  clientHandler,
  deleteClient,
  deleteEmployee,
  deleteProducer,
  deleteProduct,
  deleteInvoice,
  deleteOrder,
}) {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/klienci"
            element={
              <ClientsList
                getClients={getClients}
                deleteClient={deleteClient}
              />
            }
          />
          <Route
            path="/klienci/dodaj"
            element={<AddClient addClient={addClient} />}
          />
          <Route
            path="/klienci/:id"
            element={
              <ClientDetails clients={clientHandler} getClients={getClients} />
            }
          />

          <Route
            path="/pracownicy"
            element={<EmployeesList deleteEmployee={deleteEmployee} />}
          />
          <Route
            path="/pracownicy/dodaj"
            element={<AddEmployee addEmployee={addEmployee} />}
          />

          <Route
            path="/zamowienia"
            element={<OrdersList deleteOrder={deleteOrder} />}
          />
          <Route path="/pozycje/zamowienie/:id" element={<PositionsList />} />
          <Route path="/zamowienia/dodaj" element={<AddOrder />} />

          <Route
            path="/magazyn"
            element={<ProductsList deleteProduct={deleteProduct} />}
          />
          <Route
            path="/magazyn/dodaj"
            element={<AddProduct addProduct={addProduct} />}
          />
          <Route path="/magazyn/edytuj" element={<EditProduct />} />

          <Route
            path="/faktury"
            element={<InvoiceList deleteInvoice={deleteInvoice} />}
          />
          <Route
            path="/faktury/zamowienia/:id"
            element={<InvoiceOrderList />}
          />

          <Route
            path="/producenci"
            element={<ProducersList deleteProducer={deleteProducer} />}
          />
          <Route
            path="/producenci/dodaj"
            element={<AddProducer addProducer={addProducer} />}
          />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
