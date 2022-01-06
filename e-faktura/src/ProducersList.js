import "./style/ProducersList.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Table } from "react-bootstrap";

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
    fetch(`http://localhost:8080/producenci/${id}`, { method: "DELETE" }).then(
      () => console.log("Delete successful")
    );
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
                      onClick={() => handleDelete(producer.idProducenta)}
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
      {/* <div className="TableOfProducers">
        <h2>Producenci</h2>
        <div className="row">
          <h4>Id</h4>
          <h4>Nazwa</h4>
        </div>

       
      </div> */}
    </div>
  );
}

export default ProducersList;
