import "./style/AddOrder.css";
import React, { Component } from "react";
import OrderItems from "./OrderItems";
import { Form, Row, Col, Modal, ListGroup, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Error from "./Error";

class AddOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientNameInput: "",
      employeeNameInput: "",
      invoiceNameInput: "",
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
      show2: false,
      orderAdded: false,
      positionsConfirmed: false,
      emptyInvoice: false,
      emptyClient: false,
      emptyEmployee: false,
      emptyPositions: false,
    };

    this.changeClient = this.changeClient.bind(this);
    this.changeEmployee = this.changeEmployee.bind(this);
    this.changeInvoice = this.changeInvoice.bind(this);
    this.confirmItem = this.confirmItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.addOrderToOrdersList = this.addOrderToOrdersList.bind(this);
    this.addInvoiceBeforeAddOrder = this.addInvoiceBeforeAddOrder.bind(this);
    this.addPositionsToOrder = this.addPositionsToOrder.bind(this);
    this.confirmPositionsToOrder = this.confirmPositionsToOrder.bind(this);

    this.getOrderFindedInvoice = this.getOrderFindedInvoice.bind(this);
    this.connectPositionWithOrder = this.connectPositionWithOrder.bind(this);
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
      .then(([data1, data2, data3, data4]) => {
        this.setState({
          clients: data1,
          employees: data2,
          invoices: data3.filter((invoice) => invoice.dataRealizacji === null),
          orders: data4,
          thatOrder: null,
          loaded: true,
        });
      });
  }

  async changeInvoice(e) {
    if (this.state.emptyInvoice) {
      this.setState({
        emptyInvoice: false,
      });
    }
    if (e.target.value === "") {
      this.setState({
        invoiceNameInput: e.target.value,
        invoiceLoaded: false,
      });
    } else if (e.target.value == "Nowa Faktura") {
      this.setState({
        invoiceNameInput: "Nowa Faktura",
        invoiceLoaded: false,
        clientLoaded: false,
        employeeLoaded: false,
        oldInvoice: false,
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
    if (this.state.emptyClient) {
      this.setState({
        emptyClient: false,
      });
    }
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
    if (this.state.emptyEmployee) {
      this.setState({
        emptyEmployee: false,
      });
    }
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

  confirmItem(item, confirmedOnce) {
    this.setState({
      emptyPositions: false,
    });
    if (confirmedOnce == -1) {
      this.setState({
        itemsList: [...this.state.itemsList, item],
      });
    } else {
      this.setState({
        itemsList: this.state.itemsList.map((el) => {
          if (el.id === confirmedOnce) {
            el.ilosc = item.ilosc;
          }
          return el;
        }),
      });
    }
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
      show2: false,
    });
  };

  async addPositionsToOrder() {
    let itemObject = {};
    this.state.itemsList.map(async (item) => {
      itemObject = {
        ilosc: item.ilosc,
        towar: item.towar,
      };
      fetch(`http://localhost:8080/pozycje`, {
        method: "POST", // or 'PUT'
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(itemObject),
      })
        .then((resp) => resp.json())
        .then((data) => {
          this.setState({
            helpList: [...this.state.helpList, data],
          });
        });
    });
  }

  confirmPositionsToOrder() {
    if (this.state.emptyPositions) {
      this.setState({
        emptyPositions: false,
      });
    }
    this.setState({
      show: false,
      positionsConfirmed: true,
    });
  }

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
          invoiceLoaded: true,
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

  async connectPositionWithOrder() {
    this.state.helpList.map((item) => {
      fetch(`http://localhost:8080/pozycje/zamowienie/${item.nrPozycji}`, {
        method: "PUT", // or 'PUT'
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.state.thatOrder),
      });
    });
  }

  //przypisywanie faktury do zamówienia
  async addOrderToOrdersList() {
    if (this.state.invoiceNameInput === "") {
      this.setState({
        emptyInvoice: true,
      });
    } else if (!this.state.clientLoaded) {
      this.setState({
        emptyClient: true,
      });
    } else if (!this.state.employeeLoaded) {
      this.setState({
        emptyEmployee: true,
      });
    } else if (this.state.itemsList.length === 0) {
      this.setState({
        emptyPositions: true,
      });
    } else {
      {
        if (!this.state.oldInvoice) {
          await this.addInvoiceBeforeAddOrder();
        }

        await this.addPositionsToOrder();

        await this.createOrder();

        //połączenie zamówienia i pozycji
        await this.connectPositionWithOrder();

        //połączenie zamówienia i faktury
        await fetch(
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

      this.setState({
        orderAdded: true,
        show2: true,
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
      oldInvoice,
      positionsAdded,
      positionsConfirmed,
      show,
      show2,
      orderAdded,
      emptyInvoice,
      emptyClient,
      emptyEmployee,
      emptyPositions,
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
                  <option key={Math.random()} value={"Nowa Faktura"}>
                    Nowa faktura
                  </option>

                  {loaded
                    ? invoices.map((invoice) => (
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
              <ListGroup horizontal className="personInfo">
                <ListGroup.Item>{thatClient.imie}</ListGroup.Item>

                <ListGroup.Item>{thatClient.nazwisko}</ListGroup.Item>

                <ListGroup.Item>{thatClient.telefon}</ListGroup.Item>

                <ListGroup.Item>{thatClient.email}</ListGroup.Item>
              </ListGroup>
            ) : (
              <ListGroup horizontal className="personInfo">
                <ListGroup.Item>Imię</ListGroup.Item>
                <ListGroup.Item>Nazwisko</ListGroup.Item>
                <ListGroup.Item>Telefon</ListGroup.Item>
                <ListGroup.Item>E-mail</ListGroup.Item>
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
              <ListGroup horizontal className="personInfo">
                <ListGroup.Item>{thatEmployee.imie}</ListGroup.Item>

                <ListGroup.Item>{thatEmployee.nazwisko}</ListGroup.Item>

                <ListGroup.Item>{thatEmployee.telefon}</ListGroup.Item>

                <ListGroup.Item>{thatEmployee.stanowisko.nazwa}</ListGroup.Item>
              </ListGroup>
            ) : (
              <ListGroup horizontal className="personInfo">
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
                {positionsConfirmed ? (
                  this.state.itemsList.map((item) => (
                    <ListGroup horizontal className="productInfo">
                      <ListGroup.Item title={item.towar.nazwa}>
                        {item.towar.nazwa.slice(0, 12)}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {item.towar.kategoria.nazwa}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {item.towar.producent.nazwa}
                      </ListGroup.Item>
                      <ListGroup.Item>{item.towar.cenaNetto}</ListGroup.Item>
                      <ListGroup.Item>
                        {item.towar.kategoria.stawkaVat}
                      </ListGroup.Item>
                      <ListGroup.Item>{item.towar.cenaBrutto}</ListGroup.Item>
                      <ListGroup.Item>{item.ilosc}</ListGroup.Item>
                    </ListGroup>
                  ))
                ) : (
                  <OrderItems
                    confirmItem={this.confirmItem}
                    deleteItem={this.deleteItem}
                  />
                )}
              </Col>
            </Form.Group>
          </Form>
          <div className="forButtons">
            <Error error={emptyPositions} info="Proszę wybrać pozycje." />
            <Button
              variant="secondary"
              className={`confirmPositions ${
                positionsConfirmed ? "invisible" : ""
              }`}
              onClick={() => {
                if (this.state.itemsList.length === 0) {
                  this.setState({
                    emptyPositions: true,
                  });
                } else {
                  this.setState({
                    emptyPositions: false,
                    positionsAdded: true,
                    show: true,
                  });
                }
              }}
            >
              Potwierdź pozycje
            </Button>

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
                    onClick={this.confirmPositionsToOrder}
                  >
                    Tak, potwierdź
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      this.setState({
                        show: false,
                        positionsConfirmed: false,
                      });
                    }}
                  >
                    Cofnij
                  </Button>
                </Modal.Footer>
              </Modal>
            ) : null}
            <Error
              className="error"
              error={emptyInvoice}
              info="Pole Faktura nie może być puste!"
            />
            <Error
              className="error"
              error={emptyClient}
              info="Pole Klient nie może być puste!"
            />
            <Error
              className="error"
              error={emptyEmployee}
              info="Pole Pracownik nie może być puste!"
            />
            <Button
              variant="primary"
              className="addOrder"
              onClick={this.addOrderToOrdersList}
            >
              Dodaj zamówienie
            </Button>
            {orderAdded ? (
              <Modal show={show2} onHide={this.handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                  Zamówienie zostało dodane. Kwota zamówienia brutto wynosi...
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleClose}>
                    OK
                    {show2 ? null : <Navigate to="/zamowienia" />}
                  </Button>
                </Modal.Footer>
              </Modal>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default AddOrder;
