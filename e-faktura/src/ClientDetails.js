import "./style/ClientDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

function ClientDetails() {
  const { id } = useParams();
  let navigate = useNavigate();
  let [thatClient, setThatClientState] = useState({});
  let [loaded, setLoaded] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/klienci");
      const body = await response.json();
      setThatClientState(
        body.find((client) => client.idKlienta === parseInt(id))
      );
      setLoaded(true);
    };
    fetchData();
  }, []);

  function handleOnClick() {
    navigate("/klienci");
  }

  return (
    <div className="ClientDetails">
      <aside>
        <button onClick={handleOnClick}>Powrót</button>
      </aside>
      {loaded ? (
        <div className="clientInfo">
          <div className="clientInfoFirstColumn">
            <p>Imie: </p>
            <p>Nazwisko: </p>
            <p>Telefon: </p>
            <p>E-mail: </p>
            <p>Nazwa firmy: </p>
            <p>Nip: </p>
            <p>Ulica: </p>
            <p>Nr. lokalu: </p>
            <p>Kod pocztowy: </p>
            <p>Miejscowość: </p>
            <p>Kraj: </p>
          </div>
          <div className="clientInfoSecondColumn">
            <p>{thatClient.imie}</p>
            <p>{thatClient.nazwisko}</p>
            <p>{thatClient.telefon}</p>
            <p>{thatClient.email}</p>
            <p>{thatClient.nazwaFirmy}</p>
            <p>{thatClient.nip}</p>
            <p>{thatClient.ulica}</p>
            <p>{thatClient.nrLokalu}</p>
            <p>{thatClient.kodPocztowy}</p>
            <p>{thatClient.miejscowosc}</p>
            <p>{thatClient.kraj}</p>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

export default ClientDetails;
