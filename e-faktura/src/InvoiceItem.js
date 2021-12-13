import "./style/InvoiceItem.css";
import React, { Component } from "react";

class InvoiceItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productNameInput: "",
      defaultProduct: {
        nazwa: "nazwa",
        producent: { nazwa: "producent" },
        kategoria: { nazwa: "kategoria", stawkaVat: "stawka Vat" },
        cenaNetto: "cena netto",
        cenaBrutto: "cena brutto",
      },
      thatProduct: {},
      amountInput: "",
      products: [],
      loaded: false,
      productLoaded: false,
    };

    this.changeProduct = this.changeProduct.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.addItemToOrdersList = this.addItemToOrdersList.bind(this);
  }

  componentDidMount() {
    fetch("/towary", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => this.setState({ products: data, loaded: true }));
  }

  changeProduct(e) {
    if (e.target.value === "") {
      this.setState({
        productNameInput: e.target.value,
        productLoaded: false,
      });
    } else {
      this.setState({
        productNameInput: e.target.value,
        thatProduct: this.state.products.find(
          (product) => product.nazwa === e.target.value
        ),
        productLoaded: true,
      });
    }
  }
  changeAmount(e) {
    this.setState({
      amountInput: e.target.value,
    });
  }

  async addItemToOrdersList() {
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
      productNameInput,
      thatProduct,
      defaultProduct,
      productLoaded,
      loaded,
      products,
    } = this.state;

    return (
      <div className="AddItemForm">
        <div className="nextLineToAdd">
          <div className="inputContainer">
            <p>Towar</p>
            <select
              name="name"
              value={productNameInput}
              onChange={this.changeProduct}
            >
              <option key={Math.random()}>{""}</option>
              {loaded
                ? products.map((product) => (
                    <option key={Math.random()}>{product.nazwa}</option>
                  ))
                : null}
            </select>
          </div>
        </div>
        <ul className="productInfo">
          <li>Nazwa</li>
          <li>Kategoria</li>
          <li>Producent</li>
          <li>Cena netto</li>
          <li>Stawka VAT</li>
          <li>Cena brutto</li>
          <li>Ilość</li>
        </ul>
        {productLoaded ? (
          <ul className="productInfo">
            <li>{thatProduct.nazwa}</li>
            <li>{thatProduct.kategoria.nazwa}</li>
            <li>{thatProduct.producent.nazwa}</li>
            <li>{thatProduct.cenaNetto}</li>
            <li>{thatProduct.kategoria.stawkaVat}</li>
            <li>{thatProduct.cenaBrutto}</li>
            <input type="number" />
          </ul>
        ) : (
          <ul className="productInfo">
            <li>{defaultProduct.nazwa}</li>
            <li>{defaultProduct.kategoria.nazwa}</li>
            <li>{defaultProduct.producent.nazwa}</li>
            <li>{defaultProduct.cenaNetto}</li>
            <li>{defaultProduct.kategoria.stawkaVat}</li>
            <li>{defaultProduct.cenaBrutto}</li>
            <li>{""}</li>
          </ul>
        )}
      </div>
    );
  }
}

export default InvoiceItem;
