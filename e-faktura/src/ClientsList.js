import "./style/ClientsList.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function ClientsList({ clients }) {
  let navigate = useNavigate();
  let [clientsList, setClientsListState] = useState({ clientsList: [] });
  let [loaded, setLoaded] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/klienci");
      const body = await response.json();
      setClientsListState(body);
      setLoaded(true);
    };
    fetchData();
  }, []);

  function handleOnClick() {
    navigate("/klienci/dodaj");
  }

  return (
    <div className="ClientsList">
      <aside>
        <button onClick={handleOnClick}>Dodaj klienta</button>
      </aside>
      <div className="TableOfClients">
        <h2>Klienci</h2>
        <div className="row">
          <h4>Imie</h4>
          <h4>Nazwisko</h4>
          <h4>Telefon</h4>
          <h4>E-mail</h4>
        </div>

        {loaded ? (
          clientsList.map((client) => {
            return (
              <div key={client.id} className="row">
                <p>{client.imie}</p>
                <p>{client.nazwisko}</p>
                <p>{client.telefon}</p>
                <p>-</p>
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

export default ClientsList;
