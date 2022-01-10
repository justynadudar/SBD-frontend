import "./style/EmployeesList.css";
import "./style/AddEmployee.css";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import Error from "./Error";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: "",
      surnameInput: "",
      numberInput: "",
      positionInput: "",
      employees: [],
      positions: [],
      loaded: false,

      emptyNameField: false,
      wrongNameField: false,
      emptySurnameField: false,
      wrongSurnameField: false,
      emptyNumberField: false,
      wrongNumberField: false,
      emptyPositionField: false,
      employeeAdded: false,
      show: false,
      navigate: false,
    };
    this.changeName = this.changeName.bind(this);
    this.changeSurname = this.changeSurname.bind(this);
    this.changeNumber = this.changeNumber.bind(this);
    this.changePosition = this.changePosition.bind(this);
    this.AddEmployeeToEmployeesList =
      this.AddEmployeeToEmployeesList.bind(this);
  }

  componentDidMount() {
    Promise.all([fetch("/pracownicy"), fetch("/stanowiska")])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) =>
        this.setState({
          employees: data1,
          positions: data2,
          loaded: true,
        })
      );
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
    if (this.state.wrongSurnameField) {
      this.setState({
        wrongSurnameField: false,
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
  changePosition(e) {
    if (this.state.emptyPositionField) {
      this.setState({
        emptyPositionField: false,
      });
    }
    this.setState({
      positionInput: e.target.value,
    });
  }

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  async AddEmployeeToEmployeesList() {
    var letters = /^[A-Za-z]+$/;
    var firstLetters = /^[A-Z]+$/;
    if (this.state.nameInput.length === 0) {
      this.setState({
        emptyNameField: true,
      });
    } else if (
      !this.state.nameInput.match(letters) ||
      !this.state.nameInput.slice(0, 1).match(firstLetters)
    ) {
      this.setState({
        wrongNameField: true,
      });
    } else if (this.state.surnameInput.length === 0) {
      this.setState({
        emptySurnameField: true,
      });
    } else if (
      !this.state.surnameInput.match(letters) ||
      !this.state.surnameInput.slice(0, 1).match(firstLetters)
    ) {
      this.setState({
        wrongSurnameField: true,
      });
    } else if (this.state.numberInput.length === 0) {
      this.setState({
        emptyNumberField: true,
      });
    } else if (
      this.state.numberInput.length > 0 &&
      this.state.numberInput.length < 9
    ) {
      this.setState({
        wrongNumberField: true,
      });
    } else if (this.state.positionInput.length === 0) {
      this.setState({
        emptyPositionField: true,
      });
    } else {
      const findedPosition = this.state.positions.find(
        (el) => el.nazwa === this.state.positionInput
      );

      const employeeObject = {
        imie: this.state.nameInput,
        nazwisko: this.state.surnameInput,
        telefon: this.state.numberInput.slice(2, this.state.numberInput.length),
        stanowisko: findedPosition,
      };

      fetch(`http://localhost:8080/pracownicy`, {
        method: "POST", // or 'PUT'
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(employeeObject),
      })
        .then((response) => {
          return response.json();
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      this.setState({
        employeeAdded: true,
        show: true,
      });
    }
  }

  render() {
    const {
      nameInput,
      surnameInput,
      numberInput,
      positionInput,
      loaded,
      positions,
      employeeAdded,
      show,
      emptyNameField,
      emptySurnameField,
      emptyNumberField,
      wrongNumberField,
      emptyPositionField,
      wrongNameField,
      wrongSurnameField,
      navigate,
    } = this.state;
    return (
      <div className="EmployeesList">
        <aside>
          <button onClick={() => this.setState({ navigate: true })}>
            {navigate ? <Navigate to="/pracownicy" /> : null}
            Powrót
          </button>
        </aside>
        <div className="AddEmployeeForm">
          <h2>Nowy pracownik</h2>
          <div className="nextLineToAdd">
            <div className="inputContainer">
              <p>Imię</p>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="imię"
                value={nameInput}
                onChange={this.changeName}
              />
            </div>
            <div className="inputContainer">
              <p>Nazwisko</p>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="nazwisko"
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
              <p>Stanowisko</p>
              <select
                class="form-control form-control-sm"
                id="exampleFormControlSelect1"
                placeholder="stanowisko"
                value={positionInput}
                onChange={this.changePosition}
              >
                <option></option>
                {loaded
                  ? positions.map((position) => (
                      <option key={Math.random()}>{position.nazwa}</option>
                    ))
                  : null}
              </select>
            </div>
            <Error
              error={emptyNameField}
              info="Pole imię nie może być puste!"
            />
            <Error
              error={wrongNameField}
              info="Imię powinno zaczynać się z dużej litery oraz nie powinno zawierać cyfr!"
            />

            <Error
              error={emptySurnameField}
              info="Pole nazwisko nie może być puste!"
            />
            <Error
              error={wrongSurnameField}
              info="Nazwisko powinno zaczynać się z dużej litery oraz nie powinno zawierać cyfr!"
            />
            <Error
              error={emptyNumberField}
              info="Pole numer nie może być puste!"
            />
            <Error error={wrongNumberField} info="Podano za krótki numer!" />
            <Error
              error={emptyPositionField}
              info="Pole stanowisko nie może być puste!"
            />
          </div>

          <button onClick={this.AddEmployeeToEmployeesList}>
            Dodaj pracownika
          </button>
          {employeeAdded ? (
            <Modal show={show} onHide={this.handleClose}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                Producent o nazwie {nameInput} został dodany
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  OK
                  {show ? null : <Navigate to="/pracownicy" />}
                </Button>
              </Modal.Footer>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default AddEmployee;
