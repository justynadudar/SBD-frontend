import "../style/ClientsList.css";
import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { MdReadMore } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { Table } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";

function ClientsList() {
  let navigate = useNavigate();
  let [clientsList, setClientsListState] = useState({ clientsList: [] });
  let [loaded, setLoaded] = useState("");
  let [show, setShow] = useState(false);
  let [deletedProductId, setId] = useState("");

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

  function handleClose() {
    setShow(false);
  }

  async function handleDelete(id) {
    await fetch(`http://localhost:8080/klienci/${id}`, {
      method: "DELETE",
    }).then(() => {
      setShow(false);
      const fetchData = async () => {
        const response = await fetch("/klienci");
        const body = await response.json();
        setClientsListState(body);
        setLoaded(true);
      };
      fetchData();
    });
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
                  <td>
                    <Link
                      to={{
                        pathname: `/klienci/${client.idKlienta}`,
                        state: { modal: true },
                      }}
                    >
                      Szczegóły
                    </Link>
                  </td>
                  <td>
                    <button
                      className="false btn-close btn-close-black "
                      key={Math.random()}
                      onClick={() => {
                        setShow(true);
                        setId(client.idKlienta);
                      }}
                    ></button>
                  </td>
                </tr>
              );
            })
          ) : (
            <h2>Loading...</h2>
          )}
        </tbody>
      </Table>
      {show ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>Czy napewno chcesz usunąć tego klienta?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => handleDelete(deletedProductId)}
            >
              Tak, potwierdź
              {show ? null : window.location.reload()}
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setShow(false);
              }}
            >
              Cofnij
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
    </div>
  );
}

export default ClientsList;
