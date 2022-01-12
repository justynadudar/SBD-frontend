import "./style/ClientsList.css";
import "./style/AddClient.css";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import Error from "./Error";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import countryList from "react-select-country-list";

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
      countries: countryList().getData(),
      clientAdded: false,
      show: false,
      emptyNameField: false,
      emptyCompanyField: false,
      emptyNIPField: false,
      wrongSizeNIP: false,
      emptyStreetField: false,
      emptyApartmentField: false,
      emptyPostcodeField: false,
      emptyTownField: false,
      emptyCountryField: false,
      emptySurnameField: false,
      emptyNumberField: false,
      emptyEmailField: false,
      wrongNameField: false,
      wrongNumberField: false,
      smallFirstLetterStreet: false,
      smallFirstLetterTown: false,
      smallFirstLetterName: false,
      smallFirstLetterSurname: false,
      wrongFormatPostcode: false,
      wrongFormatEmail: false,
      wrongNIP: false,
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
    this.handleClose = this.handleClose.bind(this);
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
    this.state.countries.map((country) => {
      if (country.value === "PL") country.label = "Polska";
    });
  }

  changeName(e) {
    if (this.state.emptyNameField) {
      this.setState({
        emptyNameField: false,
      });
    }
    if (this.state.wrongNameField) {
      this.setState({
        wrongNameField: false,
      });
    }
    this.setState({
      nameInput: e.target.value,
    });
  }

  changeSurname(e) {
    if (this.state.emptySurnameField) {
      this.setState({
        emptySurnameField: false,
      });
    }
    this.setState({
      surnameInput: e.target.value,
    });
  }

  changeNumber(phone) {
    if (this.state.emptyNumberField) {
      this.setState({
        emptyNumberField: false,
      });
    }
    if (this.state.wrongNumberField) {
      this.setState({
        wrongNumberField: false,
      });
    }
    this.setState({
      numberInput: phone,
    });
  }

  changeEmail(e) {
    if (this.state.emptyEmailField) {
      this.setState({
        emptyEmailField: false,
      });
    }
    this.setState({
      emailInput: e.target.value,
    });
  }

  changeTown(e) {
    if (this.state.emptyTownField) {
      this.setState({
        emptyTownField: false,
      });
    }
    this.setState({
      townInput: e.target.value,
    });
  }

  changePostcode(e) {
    if (this.state.emptyPostcodeField) {
      this.setState({
        emptyPostcodeField: false,
      });
    }
    this.setState({
      postcodeInput: e.target.value,
    });
  }

  changeCountry = (value) => {
    if (this.state.emptyCountryField) {
      this.setState({
        emptyCountryField: false,
      });
    }
    this.setState({
      countryInput: value,
    });
  };

  changeCompanyName(e) {
    if (this.state.emptyCompanyField) {
      this.setState({
        emptyCompanyField: false,
      });
    }
    this.setState({
      companyInput: e.target.value,
    });
  }

  changeNip(e) {
    if (this.state.emptyNIPField) {
      this.setState({
        emptyNIPField: false,
      });
    }
    if (this.state.wrongSizeNIP) {
      this.setState({
        wrongSizeNIP: false,
      });
    }
    if (this.state.wrongNIP) {
      this.setState({
        wrongNIP: false,
      });
    }
    this.setState({
      nipInput: e.target.value,
    });
  }

  changApartmentNumber(e) {
    if (this.state.emptyApartmentField) {
      this.setState({
        emptyApartmentField: false,
      });
    }
    this.setState({
      apartmentInput: e.target.value,
    });
  }

  changeStreet(e) {
    if (this.state.emptyStreetField) {
      this.setState({
        emptyStreetField: false,
      });
    }
    if (this.state.smallFirstLetterStreet) {
      this.setState({
        smallFirstLetterStreet: false,
      });
    }
    this.setState({
      streetInput: e.target.value,
    });
  }

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  async addClientToClientsList() {
    var letters = /^[A-Za-z]+$/;
    var firstLetters = /^[A-Z]+$/;
    if (this.state.companyInput.length === 0) {
      this.setState({
        emptyCompanyField: true,
      });
    } else if (this.state.nipInput.length === 0) {
      this.setState({
        emptyNIPField: true,
      });
    } else if (this.state.nipInput.length !== 10) {
      this.setState({
        wrongSizeNIP: true,
      });
    } else if (
      this.state.clients.filter((client) => client.nip == this.state.nipInput)
        .length !== 0
    ) {
      this.setState({
        wrongNIP: true,
      });
    } else if (this.state.streetInput.length === 0) {
      this.setState({
        emptyStreetField: true,
      });
    } else if (!this.state.streetInput.slice(0, 1).match(firstLetters)) {
      this.setState({
        smallFirstLetterStreet: true,
      });
    } else if (this.state.apartmentInput.length === 0) {
      this.setState({
        emptyApartmentField: true,
      });
    } else if (this.state.postcodeInput.length === 0) {
      this.setState({
        emptyPostcodeField: true,
      });
    } else if (!this.state.postcodeInput.match(/^\d\d-\d\d\d$/)) {
      this.setState({
        wrongFormatPostcode: true,
      });
    } else if (this.state.townInput.length === 0) {
      this.setState({
        emptyTownField: true,
      });
    } else if (!this.state.nameInput.slice(0, 1).match(firstLetters)) {
      this.setState({
        smallFirstLetterName: true,
      });
    } else if (this.state.countryInput.length === 0) {
      this.setState({
        emptyCountryField: true,
      });
    } else if (this.state.nameInput.length === 0) {
      this.setState({
        emptyNameField: true,
      });
    } else if (!this.state.nameInput.slice(0, 1).match(firstLetters)) {
      this.setState({
        smallFirstLetterName: true,
      });
    } else if (this.state.surnameInput.length === 0) {
      this.setState({
        emptySurnameField: true,
      });
    } else if (!this.state.surnameInput.slice(0, 1).match(firstLetters)) {
      this.setState({
        smallFirstLetterSurname: true,
      });
    } else if (this.state.numberInput.length === 0) {
      this.setState({
        emptyNumberField: true,
      });
    } else if (this.state.emailInput.length === 0) {
      this.setState({
        emptyEmailField: true,
      });
    } else if (
      !this.state.emailInput
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      this.setState({
        wrongFormatEmail: true,
      });
    } else {
      const clientObject = {
        imie: this.state.nameInput,
        nazwisko: this.state.surnameInput,
        telefon: this.state.numberInput.slice(2, this.state.numberInput.length),
        email: this.state.emailInput,
        kodPocztowy: this.state.postcodeInput,
        kraj: this.state.countryInput.label,
        miejscowosc: this.state.townInput,
        nazwaFirmy: this.state.companyInput,
        nip: this.state.nipInput,
        nrLokalu: this.state.apartmentInput,
        ulica: this.state.streetInput,
      };
      console.log(clientObject);

      fetch(`http://localhost:8080/klienci`, {
        method: "POST", // or 'PUT'
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(clientObject),
      });
      this.setState({
        clientAdded: true,
        show: true,
      });
    }
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
      emptyNameField,
      clientAdded,
      show,
      emptyCompanyField,
      emptyNIPField,
      wrongSizeNIP,
      emptyStreetField,
      emptyApartmentField,
      emptyPostcodeField,
      emptyTownField,
      emptyCountryField,
      emptySurnameField,
      emptyNumberField,
      emptyEmailField,
      smallFirstLetterStreet,
      wrongFormatPostcode,
      countries,
      smallFirstLetterTown,
      smallFirstLetterName,
      smallFirstLetterSurname,
      wrongFormatEmail,
      wrongNIP,
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
                class="form-control"
                name="company"
                value={companyInput}
                onChange={this.changeCompanyName}
              />
            </div>
            <div className="inputContainer">
              <p>Numer NIP</p>
              <input
                type="number"
                class="form-control"
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
                class="form-control"
                name="street"
                value={streetInput}
                onChange={this.changeStreet}
              />
            </div>
            <div className="inputContainer">
              <p>Nr. Lokalu</p>
              <input
                type="text"
                class="form-control"
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
                class="form-control"
                pattern="^[0-9]{2}-[0-9]{3}$"
                value={postcodeInput}
                onChange={this.changePostcode}
              />
            </div>
            <div className="inputContainer">
              <p>Miejscowość</p>
              <input
                type="text"
                name="town"
                class="form-control"
                value={townInput}
                onChange={this.changeTown}
              />
            </div>
            <div className="inputContainer">
              <p>Kraj</p>

              <Select
                options={countries}
                value={countryInput}
                onChange={this.changeCountry}
              />
            </div>
          </div>
          <div className="nextLineToAdd">
            <div className="inputContainer">
              <p>Imię</p>
              <input
                type="text"
                class="form-control"
                name="name"
                value={nameInput}
                onChange={this.changeName}
              />
            </div>
            <div className="inputContainer">
              <p>Nazwisko</p>
              <input
                type="text"
                class="form-control"
                name="surname"
                value={surnameInput}
                onChange={this.changeSurname}
              />
            </div>
          </div>
          <div className="nextLineToAdd">
            <div className="inputContainer">
              <p>Telefon</p>
              <PhoneInput
                country={"pl"}
                value={numberInput}
                onChange={(phone) => this.changeNumber(phone)}
                masks={{ fr: "(...) ..-..-..", at: "(....) ...-...." }}
                isValid={(value, country) => {
                  if (value.match(/12345/)) {
                    return "Invalid value: " + value + ", " + country.name;
                  } else if (value.match(/1234/)) {
                    return false;
                  } else {
                    return true;
                  }
                }}
              />
            </div>
            <div className="inputContainer">
              <p>E-mail</p>
              <input
                type="email"
                class="form-control"
                name="email"
                value={emailInput}
                onChange={this.changeEmail}
              />
            </div>
          </div>
          <Error
            error={emptyCompanyField}
            info="Pole Nazwa firmy nie może być puste!"
          />
          <Error error={emptyNIPField} info="Pole NIP nie może być puste!" />
          <Error
            error={wrongSizeNIP}
            info="Pole NIP powinno zawierać 10 cyfr!"
          />
          <Error error={wrongNIP} info="Klient z takim NIPEM już istnieje!" />
          <Error
            error={emptyStreetField}
            info="Pole Ulica nie może być puste!"
          />
          <Error
            error={emptyApartmentField}
            info="Pole Nr. lokalu nie może być puste!"
          />
          <Error
            error={emptyPostcodeField}
            info="Pole Kod pocztowy nie może być puste!"
          />
          <Error
            error={emptyTownField}
            info="Pole Miejscowość nie może być puste!"
          />
          <Error
            error={emptyCountryField}
            info="Pole Kraj nie może być puste!"
          />
          <Error error={emptyNameField} info="Pole Imię nie może być puste!" />
          <Error
            error={emptySurnameField}
            info="Pole Nazwisko nie może być puste!"
          />
          <Error
            error={emptyNumberField}
            info="Pole Telefon nie może być puste!"
          />
          <Error
            error={emptyEmailField}
            info="Pole E-mail nie może być puste!"
          />
          <Error
            error={smallFirstLetterStreet}
            info="Ulica powinna zaczynać się z dużej litery!"
          />
          <Error
            error={smallFirstLetterTown}
            info="Miejscowość powinna zaczynać się z dużej litery!"
          />
          <Error
            error={smallFirstLetterName}
            info="Imię powinna zaczynać się z dużej litery!"
          />
          <Error
            error={smallFirstLetterSurname}
            info="Nazwisko powinna zaczynać się z dużej litery!"
          />
          <Error
            error={wrongFormatPostcode}
            info="Kod pocztowy jest niepoprawny"
          />
          <Error error={wrongFormatEmail} info="Email jest niepoprawny" />
          <button onClick={this.addClientToClientsList}>Dodaj Klienta</button>
          {clientAdded ? (
            <Modal show={show} onHide={this.handleClose}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                Klient {nameInput} {surnameInput} został dodany.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  OK
                  {show ? null : <Navigate to="/klienci" />}
                </Button>
              </Modal.Footer>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default AddClient;
