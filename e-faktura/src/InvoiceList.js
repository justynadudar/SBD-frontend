import "./style/ClientsList.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function InvoiceList() {
  let navigate = useNavigate();
  let [invoiceList, setInvoiceListState] = useState({ invoiceList: [] });
  let [loaded, setLoaded] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/faktury");
      const body = await response.json();
      setInvoiceListState(body);
      setLoaded(true);
    };
    fetchData();
  }, []);

  function handleOnClick() {
    navigate("/faktury/dodaj");
  }

  return (
    <div className="ClientsList">
      <aside>
        <button onClick={handleOnClick}>Nowa faktura</button>
      </aside>
      <div className="TableOfClients">
        <h2>Wystawione faktury</h2>
        <div className="row">
          <h4>Id zamowienia</h4>
          <h4>Id pracownika</h4>
          <h4>Data wystawienia</h4>
          <h4>Suma brutto</h4>
          <h4>Nabywca</h4>
        </div>

        {loaded ? (
          invoiceList.map((client) => {
            return (
              <div key={Math.random()} className="row">
                <p key={Math.random()}>{client.imie}</p>
                <p key={Math.random()}>{client.nazwisko}</p>
                <p key={Math.random()}>{client.telefon}</p>
                <p key={Math.random()}>{client.email}</p>
              </div>
            );
          })
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
}

export default InvoiceList;
