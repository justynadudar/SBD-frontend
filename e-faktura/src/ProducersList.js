import "./style/ProducersList.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

function ProducersList({ producers }) {
  let navigate = useNavigate();
  let [producersList, setProducersListState] = useState({ producersList: [] });
  let [loaded, setLoaded] = useState("");

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
    fetch(`http://localhost:8080/producenci/${id}`, { method: 'DELETE' })
        .then(() => console.log('Delete successful'));
  }

  return (
    <div className="ProducersList">
      <aside>
        <button onClick={handleOnClick}>Nowy producent</button>
      </aside>
      <div className="TableOfProducers">
        <h2>Producenci</h2>
        <div className="row">
          <h4>Id</h4>
          <h4>Nazwa</h4>
        </div>

        {loaded ? (
          producersList.map((producer) => {
            return (
              <div key={producer.idProducenta} className="row">
                <p>{producer.idProducenta}</p>
                <p>{producer.nazwa}</p>
                <button
                    key={Math.random()}
                    onClick={() => handleDelete(producer.idProducenta)}
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

export default ProducersList;
