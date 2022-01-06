import "./style/ClientsList.css";
import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { MdReadMore } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { Table } from "react-bootstrap";

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
    fetch(`http://localhost:8080/klienci/${id}`, { method: "DELETE" }).then(
      () => console.log("Delete successful")
    );
  }

  return (
    <div className="ClientsList">
      <aside>
        <button onClick={handleOnClick}>Nowy klient</button>
      </aside>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Telefon</th>
            <th>E-mail</th>
            <th>Rabat</th>
            <th>Szczegóły</th>
            <th>Usuń</th>
          </tr>
        </thead>
        <tbody>
          {loaded ? (
            clientsList.map((client) => {
              return (
                <tr>
                  <td>{client.imie}</td>
                  <td>{client.nazwisko}</td>
                  <td>{client.telefon}</td>
                  <td>{client.email}</td>

                  {client?.rabat?.procentRabatu === undefined ? (
                    <td>0%</td>
                  ) : (
                    <td>{client.rabat.procentRabatu}%</td>
                  )}
                  <td>
                    <Link
                      to={{
                        pathname: `/klienci/${client.idKlienta}`,
                        state: { modal: true },
                      }}
                    >
                      <MdReadMore />
                    </Link>
                  </td>
                  <td>
                    <button
                      key={Math.random()}
                      onClick={() => handleDelete(client.idKlienta)}
                    >
                      <AiOutlineClose className="false" />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <h2>Loading...</h2>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default ClientsList;
