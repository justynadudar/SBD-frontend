import "./style/PositionsList.css";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Modal, Table, Button } from "react-bootstrap";

function PositionsList({ positions }) {
  const { id } = useParams();
  let navigate = useNavigate();
  let [positionsList, setPositionsListState] = useState({ positionsList: [] });
  let [loaded, setLoaded] = useState("");
  let [show, setShow] = useState(false);
  let [deletedPositionId, setId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/pozycje/zamowienie/" + id);
      const body = await response.json();
      setPositionsListState(body);
      setLoaded(true);
    };
    fetchData();
  }, []);

  function handleClose() {
    setShow(false);
  }

  function handleOnClick() {
    navigate("/zamowienie/" + id);
  }

  function handleDelete(id2) {
    fetch(`http://localhost:8080/pozycje/${id2}`, { method: "DELETE" }).then(
      () => {
        setShow(false);
        const fetchData = async () => {
          const response = await fetch("/pozycje/zamowienie/" + id);
          const body = await response.json();
          setPositionsListState(body);
          setLoaded(true);
        };
        fetchData();
      }
    );
  }

  return (
    <div className="PositionsList">
      <aside>
        <button onClick={handleOnClick}>Powrót</button>
      </aside>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nazwa towaru</th>
            <th>Ilość</th>
            <th>Cena netto</th>
            <th>Cena brutto</th>

            <th>Usuń</th>
          </tr>
        </thead>
        <tbody>
          {loaded ? (
            positionsList.map((position) => {
              return (
                <tr>
                  <td key={Math.random()}>{position.nrPozycji}</td>
                  <td key={Math.random()}>
                    {position.towar.idTowaru} {position.towar.nazwa}
                  </td>
                  <td key={Math.random()}>{position.ilosc}</td>
                  <td key={Math.random()}>
                    {(position.towar.cenaNetto * position.ilosc).toFixed(2)}
                  </td>
                  <td key={Math.random()}>
                    {(position.towar.cenaBrutto * position.ilosc).toFixed(2)}
                  </td>
                  {position?.zamowienie?.stanZamowienia === "OPLACONE" ? (
                    <td></td>
                  ) : (
                    <td>
                      {" "}
                      <button
                      className="false btn-close btn-close-black "
                      key={Math.random()}
                      onClick={() => {
                        setShow(true);
                        setId(position.nrPozycji);
                      }}
                    ></button>
                    </td>
                  )}
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
          <Modal.Body>Czy napewno chcesz usunąć tą pozycję?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => handleDelete(deletedPositionId)}
            >
              Tak, potwierdź
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

export default PositionsList;
