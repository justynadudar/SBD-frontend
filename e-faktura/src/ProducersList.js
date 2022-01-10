import "./style/ProducersList.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Table } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";

function ProducersList({ producers }) {
  let navigate = useNavigate();
  let [producersList, setProducersListState] = useState({ producersList: [] });
  let [loaded, setLoaded] = useState("");
  let [show, setShow] = useState(false);
  let [deletedId, setId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/producenci");
      const body = await response.json();
      setProducersListState(body);
      setLoaded(true);
    };
    fetchData();
  }, []);

  function handleOnClick() {
    navigate("/producenci/dodaj");
  }

  function handleDelete(id) {
    fetch(`http://localhost:8080/producenci/${id}`, { method: "DELETE" }).then(
      () => {
        setShow(false);
        const fetchData = async () => {
          const response = await fetch("/producenci");
          const body = await response.json();
          setProducersListState(body);
          setLoaded(true);
        };
        fetchData();
      }
    );
  }

  function handleClose() {
    setShow(false);
  }

  return (
    <div className="ProducersList">
      <aside>
        <button onClick={handleOnClick}>Nowy producent</button>
      </aside>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nazwa</th>
            <th>Usuń</th>
          </tr>
        </thead>
        <tbody>
          {loaded ? (
            producersList.map((producer) => {
              return (
                <tr>
                  <td>{producer.idProducenta}</td>
                  <td>{producer.nazwa}</td>
                  <td>
                    {" "}
                    <button
                      key={Math.random()}
                      onClick={() => {
                        setShow(true);
                        setId(producer.idProducenta);
                      }}
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
      {show ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>Czy napewno chcesz usunąć tego producenta?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleDelete(deletedId)}>
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

export default ProducersList;
