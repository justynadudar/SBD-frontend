import "../style/AddProduct.css";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Error from "../Error";
import { Form } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: "",
      amountInput: "",
      costInput: "",
      categoryInput: "",
      producerInput: "",
      producers: [],
      categories: [],
      products: [],
      loaded: false,
      navigate: false,
      emptyNameField: false,
      emptyAmountField: false,
      wrongAmount: false,
      emptyCostField: false,
      emptyCategoryField: false,
      emptyProducerField: false,
      wrongCost: false,
      show: false,
      productAdded: false,
      existingProduct: false,
    };

    this.changeName = this.changeName.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.changeCost = this.changeCost.bind(this);
    this.changeProducer = this.changeProducer.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.addProductToProductsList = this.addProductToProductsList.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    Promise.all([fetch("/towary"), fetch("/kategorie"), fetch("/producenci")])
      .then(([res1, res2, res3]) =>
        Promise.all([res1.json(), res2.json(), res3.json()])
      )
      .then(([data1, data2, data3]) =>
        this.setState({
          products: data1,
          categories: data2,
          producers: data3,
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
    if (this.state.existingProduct) {
      this.setState({
        existingProduct: false,
      });
    }
    this.setState({
      nameInput: e.target.value,
    });
  }
  changeAmount(e) {
    if (this.state.emptyAmountField) {
      this.setState({
        emptyAmountField: false,
      });
    }
    if (this.state.wrongAmount) {
      this.setState({
        wrongAmount: false,
      });
    }
    this.setState({
      amountInput: e.target.value,
    });
  }
  changeCost(e) {
    if (this.state.emptyCostField) {
      this.setState({
        emptyCostField: false,
      });
    }
    if (this.state.wrongCost) {
      this.setState({
        wrongCost: false,
      });
    }
    this.setState({
      costInput: e.target.value,
    });
  }

  changeCategory(e) {
    if (this.state.emptyCategoryField) {
      this.setState({
        emptyCategoryField: false,
      });
    }
    this.setState({
      categoryInput: e.target.value,
    });
  }

  changeProducer(e) {
    if (this.state.emptyProducerField) {
      this.setState({
        emptyProducerField: false,
      });
    }
    this.setState({
      producerInput: e.target.value,
    });
  }

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  async addProductToProductsList() {
    if (this.state.nameInput.length === 0) {
      this.setState({
        emptyNameField: true,
      });
    } else if (this.state.amountInput.length === 0) {
      this.setState({
        emptyAmountField: true,
      });
    } else if (parseInt(this.state.amountInput) <= 0) {
      this.setState({
        wrongAmount: true,
      });
    } else if (
      parseFloat(this.state.amountInput) !== parseInt(this.state.amountInput)
    ) {
      this.setState({
        wrongAmount: true,
      });
    } else if (this.state.costInput.length === 0) {
      this.setState({
        emptyCostField: true,
      });
    } else if ((parseFloat(this.state.costInput) * 100) % 1 > 0.01) {
      this.setState({
        wrongCost: true,
      });
    } else if (this.state.categoryInput.length === 0) {
      this.setState({
        emptyCategoryField: true,
      });
    } else if (this.state.producerInput.length === 0) {
      this.setState({
        emptyProducerField: true,
      });
    } else if (
      this.state.products.filter(
        (product) => product.nazwa == this.state.nameInput
      ).length !== 0
    ) {
      this.setState({
        existingProduct: true,
      });
    } else {
      const findedCategory = this.state.categories.find(
        (el) => el.nazwa === this.state.categoryInput
      );
      console.log(findedCategory);
      const findedProducer = this.state.producers.find(
        (el) => el.nazwa === this.state.producerInput
      );

      const productObject = {
        producent: findedProducer,
        kategoria: findedCategory,
        nazwa: this.state.nameInput,
        ilosc: this.state.amountInput,
        cenaNetto: this.state.costInput,
      };
      console.log(productObject);

      fetch(`http://localhost:8080/towary`, {
        method: "POST", // or 'PUT'
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(productObject),
      });
      this.setState({
        productAdded: true,
        show: true,
      });
    }
  }

  render() {
    const {
      nameInput,
      amountInput,
      costInput,
      categoryInput,
      producerInput,
      loaded,
      categories,
      producers,
      navigate,
      emptyNameField,
      emptyAmountField,
      emptyCostField,
      emptyCategoryField,
      emptyProducerField,
      wrongAmount,
      wrongCost,
      productAdded,
      show,
      existingProduct,
    } = this.state;

    return (
      <div className="Warehouse">
        <aside>
          <button onClick={() => this.setState({ navigate: true })}>
            {navigate ? <Navigate to="/magazyn" /> : null}
            Powrót
          </button>
        </aside>
        <div className="AddProductForm">
          <h2>Nowy produkt</h2>
          <div className="nextLineToAdd">
            <div className="inputContainer">
              <p>Nazwa produktu</p>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Nazwa produktu"
                value={nameInput}
                onChange={this.changeName}
              />
            </div>
            <div className="inputContainer">
              <p>Ilość</p>
              <input
                type="number"
                className="form-control"
                placeholder="Ilość"
                name="amount"
                value={amountInput}
                onChange={this.changeAmount}
              />
            </div>
            <div className="inputContainer">
              <p>Cena netto</p>
              <input
                type="number"
                step="0.01"
                className="form-control"
                placeholder="Cena netto"
                min="0"
                name="cost"
                value={costInput}
                onChange={this.changeCost}
              />
            </div>
          </div>
          <div className="nextLineToAdd">
            <div className="inputContainer">
              <p>Kategoria</p>
              <Form.Select
                className="form-control"
                value={categoryInput}
                onChange={this.changeCategory}
              >
                <option key={Math.random()} value={""}>
                  {""}
                </option>
                {loaded
                  ? categories.map((category) => (
                      <option key={Math.random()}>{category.nazwa}</option>
                    ))
                  : null}
              </Form.Select>
            </div>
            <div className="inputContainer">
              <p>Producent</p>
              <Form.Select
                className="form-control"
                value={producerInput}
                onChange={this.changeProducer}
              >
                <option key={Math.random()} value={""}>
                  {""}
                </option>
                {loaded
                  ? producers.map((producer) => (
                      <option key={Math.random()}>{producer.nazwa}</option>
                    ))
                  : null}
              </Form.Select>
            </div>
          </div>
          <Error
            error={emptyNameField}
            info="Pole Nazwa produktu nie może być puste!"
          />
          <Error
            error={existingProduct}
            info="Produkt o takiej nazwie już istnieje!"
          />
          <Error
            error={emptyAmountField}
            info="Pole Ilość nie może być puste!"
          />
          <Error error={wrongAmount} info="Podano nieprawidłową ilość!" />
          <Error
            error={emptyCostField}
            info="Pole Cena netto nie może być puste!"
          />
          <Error
            error={wrongCost}
            info="Podano nieprawidłową cenę, cena może mieć maksymalnie 2 miejsca po przecinku!"
          />
          <Error
            error={emptyCategoryField}
            info="Pole Kategoria nie może być puste!"
          />
          <Error
            error={emptyProducerField}
            info="Pole Producent nie może być puste!"
          />

          <button onClick={this.addProductToProductsList}>Dodaj produkt</button>
          {productAdded ? (
            <Modal show={show} onHide={this.handleClose}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>Produkt {nameInput} został dodany.</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  OK
                  {show ? null : <Navigate to="/magazyn" />}
                </Button>
              </Modal.Footer>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default AddProduct;
