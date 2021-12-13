import "./style/AddOrder.css";
import React, { Component } from "react";
import InvoiceItem from "./InvoiceItem";

class AddOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientNameInput: "",
      defaultClient: {
        imie: "imie",
        nazwisko: "nazwisko",
        telefon: "telefon",
        email: "e-mail",
      },
      thatClient: {},
      clients: [],
      loaded: false,
      clientLoaded: false,
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
    console.log(e.target.value);
    if (e.target.value === "") {
      this.setState({
        clientNameInput: e.target.value,
        clientLoaded: false,
      });
    } else {
      this.setState({
        clientNameInput: e.target.value,
        thatClient: this.state.clients.find(
          (client) => client.nazwaFirmy === e.target.value
        ),
        clientLoaded: true,
      });
    }
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
    const {
      clientNameInput,
      thatClient,
      loaded,
      clients,
      clientLoaded,
      defaultClient,
    } = this.state;

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
              <select
                name="name"
                value={clientNameInput}
                onChange={this.changeClient}
              >
                <option key={Math.random()}>{""}</option>
                {loaded
                  ? clients.map((client) => (
                      <option key={Math.random()}>{client.nazwaFirmy}</option>
                    ))
                  : null}
              </select>
            </div>
          </div>
          {clientLoaded ? (
            <div className="clientInfo">
              <p>{thatClient.imie}</p>
              <p>{thatClient.nazwisko}</p>
              <p>{thatClient.telefon}</p>
              <p>{thatClient.email}</p>
            </div>
          ) : (
            <div className="clientInfo">
              <p>{defaultClient.imie}</p>
              <p>{defaultClient.nazwisko}</p>
              <p>{defaultClient.telefon}</p>
              <p>{defaultClient.email}</p>
            </div>
          )}
          <h4>Pozycje: </h4>
          <InvoiceItem />
        </div>
      </div>
    );
  }
}

export default AddOrder;
