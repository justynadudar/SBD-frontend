import "./style/PositionsList.css";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

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
      <div className="TableOfPositions">
        <h2>Pozycje zamówienia</h2>
        <div className="row">
          <h4>Id pozycji</h4>
          <h4>Towar</h4>
          <h4>Ilość</h4>
        </div>

        {loaded ? (
          positionsList.map((position) => {
            return (
              <div key={position.nrPozycji} className="row">
                <p>{position.nrPozycji}</p>
                <p>{position.towar.idTowaru}</p>
                <p>{position.ilosc}</p>
                <button
                    key={Math.random()}
                    onClick={() => handleDelete(position.nrPozycji)}
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

export default PositionsList;
