import "./style/ClientsList.css";
import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { MdReadMore } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

function ClientsList() {
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

  function handleDelete(id) {
    fetch(`http://localhost:8080/klienci/${id}`, { method: 'DELETE' })
        .then(() => console.log('Delete successful'));
  }

  return (
    <div className="ClientsList">
      <aside>
        <button onClick={handleOnClick}>Nowy klient</button>
      </aside>
      <div className="TableOfClients">
        <h2>Klienci</h2>
        <div className="row">
          <h4>Imie</h4>
          <h4>Nazwisko</h4>
          <h4>Telefon</h4>
          <h4>E-mail</h4>
          <h4>Rabat</h4>
          <h4 className="last"></h4>
        </div>

        {loaded ? (
          clientsList.map((client) => {
            return (
              <div key={Math.random()} className="row">
                <p key={Math.random()}>{client.imie}</p>
                <p key={Math.random()}>{client.nazwisko}</p>
                <p key={Math.random()}>{client.telefon}</p>
                <p key={Math.random()}>{client.email}</p>
                <p key={Math.random()}>{client.rabat.procentRabatu}%</p>
                <Link
                  to={{
                    pathname: `/klienci/${client.idKlienta}`,
                    state: { modal: true },
                  }}
                >
                  <MdReadMore />
                </Link>
                <button
                    key={Math.random()}
                    onClick={() => handleDelete(client.idKlienta)}
                  >
                    <AiOutlineClose className="false" />
                  </button>
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
