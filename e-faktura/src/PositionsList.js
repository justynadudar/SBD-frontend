import "./style/PositionsList.css";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Table } from "react-bootstrap";

function PositionsList({ positions }) {
  const { id } = useParams();
  let navigate = useNavigate();
  let [positionsList, setPositionsListState] = useState({ positionsList: [] });
  let [loaded, setLoaded] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/pozycje/zamowienie/" + id);
      const body = await response.json();
      setPositionsListState(body);
      setLoaded(true);
    };
    fetchData();
  }, []);

  function handleOnClick() {
    navigate("/zamowienie/" + id);
  }

  function handleDelete(id) {
    fetch(`http://localhost:8080/pozycje/${id}`, { method: 'DELETE' })
        .then(() => console.log('Delete successful'));
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
            <th>Cena brutto</th>
            <th>Cena netto</th>

            <th>Usuń</th>
          </tr>
        </thead>
        <tbody>
          {loaded ? (
            positionsList.map((position) => {
              return (
                <tr>
                  <td key={Math.random()}>{position.nrPozycji}</td>
                  <td key={Math.random()}>{position.towar.nazwa}</td>
                  <td key={Math.random()}>{position.ilosc}</td>
                  <td key={Math.random()}>{(position.towar.cenaBrutto*position.ilosc).toFixed(2)}</td>
                  <td key={Math.random()}>{(position.towar.cenaNetto*position.ilosc).toFixed(2)}</td>
                  <td>
                    <button
                      key={Math.random()}
                      onClick={() => handleDelete(position.nrPozycji)}
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

export default PositionsList;
