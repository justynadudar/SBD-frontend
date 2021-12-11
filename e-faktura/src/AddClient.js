import "./style/ClientsList.css";
import "./style/AddClient.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function AddClient() {
  let navigate = useNavigate();

  let [nameInput, setNameInput] = useState("");
  let [surnameInput, setSurnameInput] = useState("");
  let [numberInput, setNumberInput] = useState("");
  let [clients, setClientsState] = useState("");

  function handleOnClick() {
    navigate("/klienci");
  }
  function changeName(e) {
    setNameInput(e.target.value);
  }
  function changeSurname(e) {
    setSurnameInput(e.target.value);
  }
  function changeNumber(e) {
    setNumberInput(e.target.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/klienci");
      const body = await response.json();
      setClientsState(body);
    };
    fetchData();
  }, []);

  function addClientToClientsList() {
    console.log(nameInput);
    console.log(surnameInput);
    console.log(numberInput);
    console.log(clients);

    const clientObject= {
      imie: nameInput,
      nazwisko: surnameInput,
      telefon: numberInput,
      nazwaFirmy: "",
      NIP: "",
      ulica: "",
      nrLokalu: "",
      miejscowosc: "",
      kodPocztowy: "",
      kraj: "",
    };

    const postData = async () => {
      await fetch("http://localhost:8080/klienci", {
        method: "POST",
        mode: 'no-cors',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Accept": "application/json",
        },
        body: JSON.stringify(clientObject),
      })
        .then(() => {
          alert("Dodano użytkownika");
        })
        .catch((error) => {
          console.error(error);
        });
    };
    postData();
  }

  return (
    <div className="ClientsList">
      <aside>
        <button onClick={handleOnClick}>Dodaj klienta</button>
      </aside>
      <div className="AddClientForm">
        <h2>Nowy klient</h2>
        <div className="nextLineToAdd">
          <div className="inputContainer">
            <p>Nazwa firmy</p>
            <input type="text" />
          </div>
          <div className="inputContainer">
            <p>Numer NIP</p>
            <input type="text" />
          </div>
        </div>
        <div className="nextLineToAdd">
          <div className="inputContainer">
            <p>Ulica</p>
            <input type="text" />
          </div>
          <div className="inputContainer">
            <p>Kod pocztowy</p>
            <input type="text" />
          </div>
          <div className="inputContainer">
            <p>Miejscowość</p>
            <input type="text" />
          </div>
          <div className="inputContainer">
            <p>Kraj</p>
            <input type="text" />
          </div>
        </div>
        <div className="nextLineToAdd">
          <div className="inputContainer">
            <p>Imie</p>
            <input
              type="text"
              name="name"
              value={nameInput}
              onChange={changeName}
            />
          </div>
          <div className="inputContainer">
            <p>Nazwisko</p>
            <input
              type="text"
              name="surname"
              value={surnameInput}
              onChange={changeSurname}
            />
          </div>
        </div>
        <div className="nextLineToAdd">
          <div className="inputContainer">
            <p>Telefon</p>
            <input
              type="tel"
              pattern="[0-9]{3} [0-9]{3} [0-9]{3}"
              name="phone"
              value={numberInput}
              onChange={changeNumber}
            />
          </div>
          <div className="inputContainer">
            <p>E-mail</p>
            <input type="text" />
          </div>
        </div>
        <button onClick={addClientToClientsList}>Dodaj Klienta</button>
      </div>
    </div>
  );
}

export default AddClient;
