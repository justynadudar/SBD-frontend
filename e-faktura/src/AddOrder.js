import "./style/AddOrder.css";
import React, { Component } from "react";
import InvoiceItem from "./InvoiceItem";

class AddOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientNameInput: "",
      thatClient: {
        imie: "imie",
        nazwisko: "nazwisko",
        telefon: "telefon",
        email: "e-mail",
      },
      clients: [],
      loaded: false,
    };

    this.changeClient = this.changeClient.bind(this);
    this.addOrderToOrdersList = this.addOrderToOrdersList.bind(this);
  }

  componentDidMount() {
    fetch("/klienci", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => this.setState({ clients: data, loaded: true }));
  }

  changeClient(e) {
    this.setState({
      clientNameInput: e.target.value,
      thatClient: this.state.clients.find(
        (client) => client.nazwaFirmy === e.target.value
      ),
    });
  }

  async addOrderToOrdersList() {
    // fetch(`http://localhost:8080/towary`, {
    //   method: "POST", // or 'PUT'
    //   headers: {
    //     "content-type": "application/json",
    //     Accept: "application/json",
    //   },
    //   body: JSON.stringify(productObject),
    // })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  }

  render() {
    const { clientNameInput, thatClient, loaded, clients } = this.state;

    return (
      <div className="OrdersList">
        <aside>
          <button>Dodaj zamówienie</button>
        </aside>
        <div className="AddOrderForm">
          <h2>Nowe zamówienie</h2>
          <div className="nextLineToAdd">
            <div className="inputContainer">
              <p>Klient</p>
              <input
                type="text"
                list="clients"
                name="name"
                value={clientNameInput}
                onChange={this.changeClient}
              />
              <datalist id="clients">
                {loaded
                  ? clients.map((client) => (
                      <option key={Math.random()}>{client.nazwaFirmy}</option>
                    ))
                  : null}
              </datalist>
            </div>
          </div>
          <div className="clientInfo">
            <p>{thatClient.imie}</p>
            <p>{thatClient.nazwisko}</p>
            <p>{thatClient.telefon}</p>
            <p>{thatClient.email}</p>
          </div>
          <h4>Pozycje: </h4>
          <InvoiceItem />
        </div>
      </div>
    );
  }
}

export default AddOrder;
