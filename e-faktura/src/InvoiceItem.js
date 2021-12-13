import "./style/AddOrder.css";
import React, { Component } from "react";

class InvoiceItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productNameInput: "",
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
    this.setState({
      productNameInput: e.target.value,
      thatProduct: this.state.products.find(
        (product) => product.nazwa === e.target.value
      ),
      productLoaded: true,
    });
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
    const { productNameInput, thatProduct, productLoaded, loaded, products } =
      this.state;

    return (
      <div className="AddOrderForm">
        <div className="nextLineToAdd">
          <div className="inputContainer">
            <p>Towar</p>
            <input
              type="text"
              list="products"
              name="name"
              value={productNameInput}
              onChange={this.changeProduct}
            />
            <datalist id="products">
              {loaded
                ? products.map((product) => (
                    <option key={Math.random()}>{product.nazwa}</option>
                  ))
                : null}
            </datalist>
          </div>
        </div>
        {productLoaded ? (
          <div className="clientInfo">
            <p>{thatProduct.nazwa}</p>
            {console.log(thatProduct)}
            <p>{thatProduct.kategoria.nazwa}</p>
            <p>{thatProduct.producent.nazwa}</p>
            <p>{thatProduct.cenaNetto}</p>
          </div>
        ) : null}
      </div>
    );
  }
}

export default InvoiceItem;
