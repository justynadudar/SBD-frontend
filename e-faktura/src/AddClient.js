import "./style/ClientsList.css";
import "./style/AddClient.css";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";

class AddClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: "",
      surnameInput: "",
      numberInput: "",
      emailInput: "",
      townInput: "",
      postcodeInput: "",
      apartmentInput: "",
      countryInput: "",
      companyInput: "",
      streetInput: "",
      nipInput: "",
      clients: [],
      navigate: false,
    };
    this.changeName = this.changeName.bind(this);
    this.changeSurname = this.changeSurname.bind(this);
    this.changeNumber = this.changeNumber.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changeTown = this.changeTown.bind(this);
    this.changePostcode = this.changePostcode.bind(this);
    this.changApartmentNumber = this.changApartmentNumber.bind(this);
    this.changeCountry = this.changeCountry.bind(this);
    this.changeCompanyName = this.changeCompanyName.bind(this);
    this.changeStreet = this.changeStreet.bind(this);
    this.changeNip = this.changeNip.bind(this);
    this.addClientToClientsList = this.addClientToClientsList.bind(this);
  }

  componentDidMount() {
    fetch("/klienci", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => this.setState({ clients: data }));
  }

  changeName(e) {
    this.setState({
      nameInput: e.target.value,
    });
  }
  changeSurname(e) {
    this.setState({
      surnameInput: e.target.value,
    });
  }
  changeNumber(e) {
    this.setState({
      numberInput: e.target.value,
    });
  }
  changeEmail(e) {
    this.setState({
      emailInput: e.target.value,
    });
  }
  changeTown(e) {
    this.setState({
      townInput: e.target.value,
    });
  }
  changePostcode(e) {
    this.setState({
      postcodeInput: e.target.value,
    });
  }
  changeCountry(e) {
    this.setState({
      countryInput: e.target.value,
    });
  }
  changeCompanyName(e) {
    this.setState({
      companyInput: e.target.value,
    });
  }
  changeNip(e) {
    this.setState({
      nipInput: e.target.value,
    });
  }
  changApartmentNumber(e) {
    this.setState({
      apartmentInput: e.target.value,
    });
  }
  changeStreet(e) {
    this.setState({
      streetInput: e.target.value,
    });
  }

  async addClientToClientsList() {
    const clientObject = {
      imie: this.state.nameInput,
      nazwisko: this.state.surnameInput,
      telefon: this.state.numberInput,
      email: this.state.emailInput,
      kodPocztowy: this.state.postcodeInput,
      kraj: this.state.countryInput,
      miejscowosc: this.state.townInput,
      nazwaFirmy: this.state.companyInput,
      nip: this.state.nipInput,
      nrLokalu: this.state.apartmentInput,
      ulica: this.state.streetInput,
    };

    fetch(`http://localhost:8080/klienci`, {
      method: "POST", // or 'PUT'
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(clientObject),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  render() {
    const {
      nameInput,
      surnameInput,
      numberInput,
      companyInput,
      nipInput,
      apartmentInput,
      streetInput,
      postcodeInput,
      townInput,
      countryInput,
      emailInput,
      navigate,
    } = this.state;
    return (
      <div className="ClientsList">
        <aside>
          <button onClick={() => this.setState({ navigate: true })}>
            {navigate ? <Navigate to="/klienci" /> : null}
            Powrót
          </button>
        </aside>
        <div className="AddClientForm">
          <h2>Nowy klient</h2>
          <div className="nextLineToAdd">
            <div className="inputContainer">
              <p>Nazwa firmy</p>
              <input
                type="text"
                name="company"
                value={companyInput}
                onChange={this.changeCompanyName}
              />
            </div>
            <div className="inputContainer">
              <p>Numer NIP</p>
              <input
                type="text"
                name="nip"
                value={nipInput}
                onChange={this.changeNip}
              />
            </div>
          </div>
          <div className="nextLineToAdd">
            <div className="inputContainer">
              <p>Ulica</p>
              <input
                type="text"
                name="street"
                value={streetInput}
                onChange={this.changeStreet}
              />
            </div>
            <div className="inputContainer">
              <p>Nr. Lokalu</p>
              <input
                type="text"
                name="apartment"
                value={apartmentInput}
                onChange={this.changApartmentNumber}
              />
            </div>
            <div className="inputContainer">
              <p>Kod pocztowy</p>
              <input
                type="text"
                name="postcode"
                value={postcodeInput}
                onChange={this.changePostcode}
              />
            </div>
            <div className="inputContainer">
              <p>Miejscowość</p>
              <input
                type="text"
                name="town"
                value={townInput}
                onChange={this.changeTown}
              />
            </div>
            <div className="inputContainer">
              <p>Kraj</p>
              <input
                type="text"
                name="country"
                value={countryInput}
                onChange={this.changeCountry}
              />
            </div>
          </div>
          <div className="nextLineToAdd">
            <div className="inputContainer">
              <p>Imie</p>
              <input
                type="text"
                name="name"
                value={nameInput}
                onChange={this.changeName}
              />
            </div>
            <div className="inputContainer">
              <p>Nazwisko</p>
              <input
                type="text"
                name="surname"
                value={surnameInput}
                onChange={this.changeSurname}
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
                onChange={this.changeNumber}
              />
            </div>
            <div className="inputContainer">
              <p>E-mail</p>
              <input
                type="text"
                name="email"
                value={emailInput}
                onChange={this.changeEmail}
              />
            </div>
          </div>
          <button onClick={this.addClientToClientsList}>Dodaj Klienta</button>
        </div>
      </div>
    );
  }
}

export default AddClient;
