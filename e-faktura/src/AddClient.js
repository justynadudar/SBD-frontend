import "./style/ClientsList.css";
import "./style/AddClient.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

function AddClient() {
  let navigate = useNavigate();

  let [nameInput, setNameInput] = useState("");
  let [surnameInput, setSurnameInput] = useState("");
  let [numberInput, setNumberInput] = useState("");

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
  //   useEffect(() => {
  //     setStateValues(clientObjectInTab);
  //   }, []);

  function addClientToClientsList() {
    console.log(nameInput);
    console.log(surnameInput);
    console.log(numberInput);

    const clientObjectInTab = [
      {
        imie: nameInput,
        nazwisko: surnameInput,
        telefon: numberInput,
      },
    ];

    axios("http://localhost:8080/klienci", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(clientObjectInTab),
    })
      .then(() => {
        alert("Dodano użytkownika");
      })
      .catch((error) => {
        console.error(error);
      });
    // axios
    //   .post("http://localhost:8080/klienci", clientObjectInTab, {
    //     headers: headers,
    //   })
    //   .then(() => {
    //     alert("Dodano użytkownika");
    //   })
    //   .catch((err) => alert("ERROR"));
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
        </div>
        <button onClick={addClientToClientsList}>Dodaj Klienta</button>
      </div>
    </div>
  );
}

export default AddClient;

//return rozszerzona wersja

// return (
//     <div className="ClientsList">
//       <aside>
//         <button onClick="handleOnClick">Dodaj klienta</button>
//       </aside>
//       <div className="AddClientForm">
//         <h2>Nowy klient</h2>
//         <div className="nextLineToAdd">
//           <div className="inputContainer">
//             <p>Nazwa firmy</p>
//             <input
//               type="text"
//               //   name="duration"
//               //   value={numberInput}
//               //   onChange={changeNumber}
//             />
//           </div>
//           <div className="inputContainer">
//             <p>Numer NIP</p>
//             <input type="text" />
//           </div>
//         </div>
//         <div className="nextLineToAdd">
//           <div className="inputContainer">
//             <p>Ulica</p>
//             <input type="text" />
//           </div>
//           <div className="inputContainer">
//             <p>Kod pocztowy</p>
//             <input type="text" />
//           </div>
//           <div className="inputContainer">
//             <p>Miejscowość</p>
//             <input type="text" />
//           </div>
//           <div className="inputContainer">
//             <p>Kraj</p>
//             <input type="text" />
//           </div>
//         </div>
//         <div className="nextLineToAdd">
//           <div className="inputContainer">
//             <p>Imie</p>
//             <input type="text" />
//           </div>
//           <div className="inputContainer">
//             <p>Nazwisko</p>
//             <input type="text" />
//           </div>
//         </div>
//         <div className="nextLineToAdd">
//           <div className="inputContainer">
//             <p>Telefon</p>
//             <input type="text" />
//           </div>
//           <div className="inputContainer">
//             <p>E-mail</p>
//             <input type="text" />
//           </div>
//         </div>
//         <button>
//           <Link to="/klienci">Dodaj Klienta</Link>
//         </button>
//       </div>
//     </div>
//   );
