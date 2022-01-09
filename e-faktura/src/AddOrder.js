import "./style/AddOrder.css";
import React, { Component } from "react";
import OrderItems from "./OrderItems";
import { Form, Row, Col, Modal, ListGroup, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";

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
      helpList: [],
      orders: [],
      loaded: false,
      clientLoaded: false,
      employeeLoaded: false,
      invoiceLoaded: false,
      oldInvoice: false,
      itemsConfirmed: false,
      positionsAdded: false,
      show: false,
    };

    this.changeClient = this.changeClient.bind(this);
    this.changeEmployee = this.changeEmployee.bind(this);
    this.changeInvoice = this.changeInvoice.bind(this);
    this.confirmItem = this.confirmItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.addOrderToOrdersList = this.addOrderToOrdersList.bind(this);
    this.addInvoiceBeforeAddOrder = this.addInvoiceBeforeAddOrder.bind(this);
    this.addPositionsToOrder = this.addPositionsToOrder.bind(this);
    this.postPosition = this.postPosition.bind(this);
    this.getOrderFindedInvoice = this.getOrderFindedInvoice.bind(this);
    this.handleClose = this.handleClose.bind(this);
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

  async changeInvoice(e) {
    if (e.target.value === "") {
      this.setState({
        invoiceNameInput: e.target.value,
        invoiceLoaded: false,
      });
    } else if (e.target.value == -1) {
      await this.addInvoiceBeforeAddOrder();
      this.setState({
        invoiceNameInput: "Nowa Faktura",
        invoiceLoaded: true,
      });
    } else {
      const finded = this.state.invoices.find(
        (invoice) => invoice.idFaktury == e.target.value
      );
      await this.getOrderFindedInvoice(finded);
      this.setState({
        invoiceNameInput: finded.idFaktury,
        thatInvoice: finded,
        invoiceLoaded: true,
        clientLoaded: true,
        employeeLoaded: true,
        oldInvoice: true,
      });
    }
  }

  async getOrderFindedInvoice(findedInvoice) {
    await fetch(
      `http://localhost:8080/faktury/zamowienia/${findedInvoice.idFaktury}`,
      {
        method: "GET", // or 'PUT'
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          thatOrder: data[0],
          thatClient: data[0].klient,
          thatEmployee: data[0].pracownik,
        });
      });
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
  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  async postPosition(object) {
    await fetch(`http://localhost:8080/pozycje`, {
      method: "POST", // or 'PUT'
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(object),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        this.setState({
          helpList: [...this.state.helpList, data],
        });
      });
  }

  async addPositionsToOrder() {
    let itemObject = {};
    this.state.itemsList.map(async (item) => {
      itemObject = {
        ilosc: item.ilosc,
        towar: item.towar,
      };
      await this.postPosition(itemObject);
    });
    this.setState({
      show: false,
    });
  }

  //tworzymy fakture, gdy uzytkownik wybierze "Nowa faktura"
  async addInvoiceBeforeAddOrder() {
    await fetch(`http://localhost:8080/faktury`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(this.state.thatInvoice),
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          thatInvoice: data,
        });
      });
    this.componentDidMount();
  }

  async createOrder() {
    if (this.state.invoiceLoaded) {
      const orderObject = {
        klient: this.state.thatClient,
        pracownik: this.state.thatEmployee,
        faktura: this.state.thatInvoice,
      };

      console.log("tworze zamówienie");
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
    if (!this.state.oldInvoice) {
      await this.createOrder();

      //pozycje połączone z zamówieniem
      this.state.helpList.map((item) => {
        console.log(item.nrPozycji);

        fetch(`http://localhost:8080/pozycje/zamowienie/${item.nrPozycji}`, {
          method: "PUT", // or 'PUT'
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(this.state.thatOrder),
        });
      });

      //połączenie zamówienia i faktury
      fetch(
        `http://localhost:8080/zamowienia/faktura/${this.state.thatOrder.idZamowienia}`,
        {
          method: "PUT", // or 'PUT'
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(this.state.thatInvoice),
        }
      );
    } else {
      //pozycje połączone z zamówieniem
      this.state.helpList.map((item) => {
        console.log(item.nrPozycji);

        fetch(`http://localhost:8080/pozycje/zamowienie/${item.nrPozycji}`, {
          method: "PUT", // or 'PUT'
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(this.state.thatOrder),
        });
      });

      //połączenie zamówinia i faktury
      fetch(
        `http://localhost:8080/zamowienia/faktura/${this.state.thatOrder.idZamowienia}`,
        {
          method: "PUT", // or 'PUT'
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(this.state.thatInvoice),
        }
      );
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
      oldInvoice,
      positionsAdded,
      show,
    } = this.state;

    return (
      <div className="OrdersList">
        <aside>
          <button>Dodaj zamówienie</button>
        </aside>
        <div className="forForm">
          <Form className="m-3">
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalEmail"
            >
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
                  {this.state.invoiceLoaded ? (
                    <option key={Math.random()} value={"Nowa Faktura"}>
                      Nowa faktura
                    </option>
                  ) : (
                    <option key={Math.random()} value={-1}>
                      Nowa faktura
                    </option>
                  )}

                  {loaded
                    ? invoices.map((invoice, index) => (
                        <option key={Math.random()} value={invoice.idFaktury}>
                          {"Nr: " +
                            invoice.idFaktury +
                            // "Klient: " +
                            //   invoice.zamowienia[0].klient.nazwaFirmy +
                            //   " Pracownik: " +
                            //   invoice.zamowienia[0].pracownik.imie +
                            //   " (" +
                            //   invoice.zamowienia[0].pracownik.nazwisko +
                            ") "}
                        </option>
                      ))
                    : null}
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column>Klient</Form.Label>
              <Col className="allSelect">
                {oldInvoice ? (
                  <Form.Select disabled aria-label="Klient"></Form.Select>
                ) : (
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
                )}
              </Col>
            </Form.Group>

            {clientLoaded ? (
              <ListGroup horizontal>
                <ListGroup.Item>{thatClient.imie}</ListGroup.Item>

                <ListGroup.Item>{thatClient.nazwisko}</ListGroup.Item>

                <ListGroup.Item>{thatClient.telefon}</ListGroup.Item>

                <ListGroup.Item>{thatClient.email}</ListGroup.Item>
              </ListGroup>
            ) : (
              <ListGroup horizontal>
                <ListGroup.Item>{defaultClient.imie}</ListGroup.Item>
                <ListGroup.Item>{defaultClient.nazwisko}</ListGroup.Item>
                <ListGroup.Item>{defaultClient.telefon}</ListGroup.Item>
                <ListGroup.Item>{defaultClient.email}</ListGroup.Item>
              </ListGroup>
            )}

            <Form.Group as={Row} className="mb-3 mt-3">
              <Form.Label column>Pracownik</Form.Label>
              <Col className="allSelect">
                {oldInvoice ? (
                  <Form.Select disabled aria-label="Pracownik"></Form.Select>
                ) : (
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
                          <option
                            key={Math.random()}
                            value={employee.idPracownika}
                          >
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
                )}
              </Col>
            </Form.Group>
            {employeeLoaded ? (
              <ListGroup horizontal>
                <ListGroup.Item>{thatEmployee.imie}</ListGroup.Item>

                <ListGroup.Item>{thatEmployee.nazwisko}</ListGroup.Item>

                <ListGroup.Item>{thatEmployee.telefon}</ListGroup.Item>

                <ListGroup.Item>{thatEmployee.stanowisko.nazwa}</ListGroup.Item>
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
              </Col>
            </Form.Group>
          </Form>
          <div>
            <button
              onClick={() =>
                this.setState({ positionsAdded: true, show: true })
              }
            >
              Potwierdź pozycje
            </button>
            {positionsAdded ? (
              <Modal show={show} onHide={this.handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                  Zatwierdzonych pozycji nie będzie można edytować, czy jesteś
                  pewien, że chcesz potwierdzić?
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={this.addPositionsToOrder}
                  >
                    Tak, potwierdź
                    {/* {show ? null : <Navigate to="/producenci" />} */}
                  </Button>
                </Modal.Footer>
              </Modal>
            ) : null}
            <button onClick={this.addOrderToOrdersList}>
              Dodaj zamówienie
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddOrder;
