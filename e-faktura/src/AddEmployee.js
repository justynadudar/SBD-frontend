import "./style/EmployeesList.css";
import "./style/AddEmployee.css";
import React, { Component } from "react";

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
      
    };
    this.changeName = this.changeName.bind(this);
    this.changeSurname = this.changeSurname.bind(this);
    this.changeNumber = this.changeNumber.bind(this);
    this.changePosition = this.changePosition.bind(this);
    this.AddEmployeeToEmployeesList = this.AddEmployeeToEmployeesList.bind(this);
  }

  componentDidMount() {
    Promise.all([fetch("/pracownicy"), fetch("/stanowiska")])
      .then(([res1, res2]) =>
        Promise.all([res1.json(), res2.json()])
      )
      .then(([data1, data2]) =>
        this.setState({
          employees: data1,
          positions: data2,
          loaded: true,
        })
      );
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
  changePosition(e) {
    this.setState({
      positionInput: e.target.value,
    });
  }

  async AddEmployeeToEmployeesList() {
    const findedPosition = this.state.positions.find(
        (el) => el.nazwa === this.state.positionInput
      );
    const employeeObject = {
      imie: this.state.nameInput,
      nazwisko: this.state.surnameInput,
      telefon: this.state.numberInput,
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
  }

  render() {
    const {
      nameInput,
      surnameInput,
      numberInput,
      positionInput,
      loaded,
      positions,
    } = this.state;
    return (
      <div className="EmployeesList">
        <aside>
          <button>Dodaj pracownika</button>
        </aside>
        <div className="AddEmployeeForm">
          <h2>Nowy pracownik</h2>
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
              <p>Stanowisko</p>
              <input
                type="text"
                list="positions"
                name="position"
                value={positionInput}
                onChange={this.changePosition}
              />
              <datalist id="positions">
                  {loaded
                    ? positions.map((position) => (
                        <option key={Math.random()}>{position.nazwa}</option>
                    ))
                    :null}
              </datalist>
            </div>
          </div>
          <button onClick={this.AddEmployeeToEmployeesList}>Dodaj pracownika</button>
        </div>
        </div>
    );
  }
}

export default AddEmployee;
