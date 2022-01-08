import "./style/AddOrder.css";
import React, { Component } from "react";
import OrderItems from "./OrderItems";
import { Form, Row, Col, ListGroup } from "react-bootstrap";

class AddOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientNameInput: "",
      employeeNameInput: "",
      invoiceNameInput: "",
      defaultClient: {
        imie: "imie",
        nazwisko: "nazwisko",
        telefon: "telefon",
        email: "e-mail",
      },
      defaultEmployee: {
        imie: "imie",
        nazwisko: "nazwisko",
        stanowisko: "stanowisko",
        telefon: "telefon",
      },
      defaultInvoice: {
        id: "faktura.id",
        klient: "faktura.zamowienie.klient.nazwaFirmy",
        pracownik: "faktura.zamowienie.pracownik.nazwaFirmy",
        data: "data wystawienia",
      },
      thatOrder: {},
      thatClient: {},
      thatEmployee: {},
      thatInvoice: {},
      clients: [],
      employees: [],
      invoices: [],
      itemsList: [],
      orders: [],
      loaded: false,
      clientLoaded: false,
      employeeLoaded: false,
      invoiceLoaded: false,
      itemsConfirmed: false,
    };

    this.changeClient = this.changeClient.bind(this);
    this.changeEmployee = this.changeEmployee.bind(this);
    this.changeInvoice = this.changeInvoice.bind(this);
    this.confirmItem = this.confirmItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.addOrderToOrdersList = this.addOrderToOrdersList.bind(this);
    this.addInvoiceBeforeAddOrder = this.addInvoiceBeforeAddOrder.bind(this);
    this.refreshInvoice = this.refreshInvoice.bind(this);
    this.addPositionsToOrder = this.addPositionsToOrder.bind(this);
  }

  componentDidMount() {
    Promise.all([
      fetch("/klienci"),
      fetch("/pracownicy"),
      fetch("/faktury"),
      fetch("/zamowienia"),
    ])
      .then(([res1, res2, res3, res4]) =>
        Promise.all([res1.json(), res2.json(), res3.json(), res4.json()])
      )
      .then(([data1, data2, data3, data4]) =>
        this.setState({
          clients: data1,
          employees: data2,
          invoices: data3,
          orders: data4,
          thatOrder: null,
          loaded: true,
        })
      );
  }

  changeInvoice(e) {
    if (e.target.value === "") {
      this.setState({
        invoiceNameInput: e.target.value,
        invoiceLoaded: false,
      });
    } else if (e.target.value == -1) {
      this.addInvoiceBeforeAddOrder();
      this.setState({
        invoiceNameInput: e.target.value,
        invoiceLoaded: true,
      });
      this.refreshInvoice();
    } else {
      const finded = this.state.invoices.find(
        (invoice) => invoice.idFaktury == e.target.value
      );
      console.log(finded);
      this.setState({
        invoiceNameInput: finded.imie,
        thatInvoice: finded,
        thatClient: finded.zamowienia[0].klient,
        thatEmployee: finded.zamowienia[0].pracownik,
        invoiceLoaded: true,
        clientLoaded: true,
        employeeLoaded: true,
      });
    }
  }

  changeClient(e) {
    if (e.target.value === "") {
      this.setState({
        clientNameInput: e.target.value,
        clientLoaded: false,
      });
    } else {
      const finded = this.state.clients.find(
        (client) => client.idKlienta == e.target.value
      );
      this.setState({
        clientNameInput: finded.imie,
        thatClient: finded,
        clientLoaded: true,
      });
    }
  }

  changeEmployee(e) {
    if (e.target.value === "") {
      this.setState({
        employeeNameInput: e.target.value,
        employeeLoaded: false,
      });
    } else {
      const finded = this.state.employees.find(
        (employee) => employee.idPracownika == e.target.value
      );
      this.setState({
        employeeNameInput: finded.imie,
        thatEmployee: finded,
        employeeLoaded: true,
      });
    }
  }

  confirmItem(item) {
    this.setState({
      itemsList: [...this.state.itemsList, item],
    });
  }

  deleteItem(id) {
    const filtered = this.state.itemsList.filter((item) => item.id !== id);
    this.setState({
      itemsList: filtered,
    });
  }

  async refreshInvoice() {
    fetch("/faktury", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          thatInvoice: data[data.length - 1],
          invoiceLoaded: true,
        });
      });
  }

  addPositionsToOrder() {
    console.log(this.state.itemsList);
    this.setState({
      itemsConfirmed: true,
    });
  }

  //tworzymy fakture, gdy uzytkownik wybierze "Nowa faktura"
  async addInvoiceBeforeAddOrder() {
    const response = await fetch(`http://localhost:8080/faktury`, {
      method: "POST", // or 'PUT'
      headers: {
        Accept: "application/json, text/plain, */*",
        "content-Type": "application/json",
      },
      body: JSON.stringify(this.state.thatInvoice),
    }).then((resp) => resp.json());

    this.componentDidMount();
  }

  async createOrder() {
    if (this.state.invoiceLoaded) {
      const orderObject = {
        klient: this.state.thatClient,
        pracownik: this.state.thatEmployee,
        faktura: this.state.thatInvoice,
      };

      await fetch(`http://localhost:8080/zamowienia`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(orderObject),
      })
        .then((resp) => resp.json())
        .then((data) => {
          this.setState({
            thatOrder: data,
          });
        });
    }
  }

  //przypisywanie faktury do zamówienia
  async addOrderToOrdersList() {
    await this.createOrder();

    const orderToInvoice = {
      id: this.state.thatOrder.idZamowienia,
      faktura: this.state.thatInvoice,
    };
    console.log(orderToInvoice);
    // fetch(
    //   `http://localhost:8080/zamowienia/faktura/${this.state.thatOrder.idZamowienia}`,
    //   {
    //     method: "PUT", // or 'PUT'
    //     headers: {
    //       "content-type": "application/json",
    //       Accept: "application/json",
    //     },
    //     body: JSON.stringify(this.state.thatInvoice),
    //   }
    // )
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
    if (this.state.itemsConfirmed) {
      let itemObject = {};
      this.state.itemsList.map((item) => {
        itemObject = {
          zamowienie: {
            idZamowienia: this.state.thatOrder.idZamowienia,
            klient: this.state.thatClient,
            pracownik: this.state.thatEmployee,
          },
          ilosc: item.ilosc,
          towar: item.towar,
        };
        console.log(itemObject);
        console.log(this.state.thatOrder);

        //   fetch(`http://localhost:8080/pozycje`, {
        //     method: "POST", // or 'PUT'
        //     headers: {
        //       "content-type": "application/json",
        //       Accept: "application/json",
        //     },
        //     body: JSON.stringify(itemObject),
        //   })
        //     .then((response) => {
        //       return response.json();
        //     })
        //     .catch((error) => {
        //       console.error("Error:", error);
        //     });
      });
    }
  }

  render() {
    const {
      clientNameInput,
      employeeNameInput,
      invoiceNameInput,
      thatClient,
      thatEmployee,
      loaded,
      clients,
      employees,
      invoices,
      clientLoaded,
      employeeLoaded,
      defaultClient,
      defaultEmployee,
    } = this.state;

    return (
      <div className="OrdersList">
        <aside>
          <button>Dodaj zamówienie</button>
        </aside>
        <Form className="m-3">
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column>Faktura</Form.Label>
            <Col className="allSelect">
              <Form.Select
                aria-label="Faktura"
                value={invoiceNameInput}
                onChange={this.changeInvoice}
              >
                <option key={Math.random()} value={""}>
                  {""}
                </option>
                <option key={Math.random()} value={-1}>
                  Nowa faktura
                </option>
                {loaded
                  ? invoices.map((invoice, index) => (
                      <option key={Math.random()} value={invoice.idFaktury}>
                        {"Nr: " +
                          invoice.idFaktury
                          // "Klient: " +
                          //   invoice.zamowienia[0].klient.nazwaFirmy +
                          //   " Pracownik: " +
                          //   invoice.zamowienia[0].pracownik.imie +
                          //   " (" +
                          //   invoice.zamowienia[0].pracownik.nazwisko +
                          }
                      </option>
                    ))
                  : null}
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column>Klient</Form.Label>
            <Col className="allSelect">
              <Form.Select
                aria-label="Klient"
                value={clientNameInput}
                onChange={this.changeClient}
              >
                <option key={Math.random()} value={""}>
                  {""}
                </option>
                {loaded
                  ? clients.map((client) => (
                      <option key={Math.random()} value={client.idKlienta}>
                        {client.nazwaFirmy}
                      </option>
                    ))
                  : null}
              </Form.Select>
            </Col>
          </Form.Group>

          {clientLoaded ? (
            <ListGroup horizontal>
              <ListGroup.Item sm={3}>{thatClient.imie}</ListGroup.Item>

              <ListGroup.Item>{thatClient.nazwisko}</ListGroup.Item>

              <ListGroup.Item>{thatClient.telefon}</ListGroup.Item>

              <ListGroup.Item>{thatClient.email}</ListGroup.Item>
            </ListGroup>
          ) : (
            <ListGroup horizontal>
              <ListGroup.Item sm={7}>{defaultClient.imie}</ListGroup.Item>
              <ListGroup.Item sm={3}>{defaultClient.nazwisko}</ListGroup.Item>
              <ListGroup.Item sm={3}>{defaultClient.telefon}</ListGroup.Item>
              <ListGroup.Item sm={3}>{defaultClient.email}</ListGroup.Item>
            </ListGroup>
          )}

          <Form.Group as={Row} className="mb-3 mt-3">
            <Form.Label column>Pracownik</Form.Label>
            <Col className="allSelect">
              <Form.Select
                aria-label="Pracownik"
                value={employeeNameInput}
                onChange={this.changeEmployee}
              >
                <option key={Math.random()} value={""}>
                  {""}
                </option>
                {loaded
                  ? employees.map((employee) => (
                      <option key={Math.random()} value={employee.idPracownika}>
                        {employee.imie +
                          " " +
                          employee.nazwisko +
                          " (" +
                          employee.stanowisko.nazwa +
                          ") "}
                      </option>
                    ))
                  : null}
              </Form.Select>
            </Col>
          </Form.Group>
          {employeeLoaded ? (
            <ListGroup horizontal>
              <ListGroup.Item>{thatEmployee.imie}</ListGroup.Item>

              <ListGroup.Item>{thatEmployee.nazwisko}</ListGroup.Item>

              <ListGroup.Item>{thatEmployee.telefon}</ListGroup.Item>

              <ListGroup.Item>{thatEmployee.stanowisko}</ListGroup.Item>
            </ListGroup>
          ) : (
            <ListGroup horizontal>
              <ListGroup.Item>Imię</ListGroup.Item>
              <ListGroup.Item>Nazwisko</ListGroup.Item>
              <ListGroup.Item>Telefon</ListGroup.Item>
              <ListGroup.Item>Stanowisko</ListGroup.Item>
            </ListGroup>
          )}
          <Form.Label column>Pozycje</Form.Label>
          <Form.Group as={Row} className="mb-3 mt-3">
            <Col>
              <ListGroup horizontal className="productInfo">
                <ListGroup.Item>Nazwa</ListGroup.Item>
                <ListGroup.Item>Kategoria</ListGroup.Item>
                <ListGroup.Item>Producent</ListGroup.Item>
                <ListGroup.Item>Cena netto</ListGroup.Item>
                <ListGroup.Item>Stawka VAT</ListGroup.Item>
                <ListGroup.Item>Cena brutto</ListGroup.Item>
                <ListGroup.Item>Ilość</ListGroup.Item>
              </ListGroup>
              <OrderItems
                confirmItem={this.confirmItem}
                deleteItem={this.deleteItem}
              />
              <button
                className="confirmPositions"
                onClick={this.addPositionsToOrder}
              >
                Potwierdź pozycje
              </button>
            </Col>
          </Form.Group>

          <button className="submit" onClick={this.addOrderToOrdersList}>
            Dodaj zamówienie
          </button>
        </Form>
      </div>
    );
  }
}

export default AddOrder;
