import "./style/OrderItem.css";
import React, { Component } from "react";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";

class OrderItems extends Component {
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
      items: [],
      itemId: 0,
      loaded: false,
      productLoaded: false,
      itemsLoaded: false,
    };

    this.changeProduct = this.changeProduct.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    //this.handleConfirm = this.handleConfirm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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

  handleConfirm() {
    const newItem = {
      id: this.state.itemId,
      towar: this.state.thatProduct,
      ilosc: parseInt(this.state.amountInput),
    };
    this.setState({
      items: [...this.state.items, newItem],
      itemsLoaded: true,
      thatProduct: {},
      productNameInput: "",
      productLoaded: false,
      id: this.state.itemId++,
    });
    this.props.confirmItems(newItem);
  }

  handleDelete(id) {
    this.setState({
      items: this.state.items.filter((item) => item.id !== id),
      itemsLoaded: true,
      thatProduct: {},
      productNameInput: "",
      productLoaded: false,
    });
    this.props.deleteItem(id);
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
      itemsLoaded,
      loaded,
      products,
      items,
    } = this.state;

    return (
      <div className="AddItemForm">
        {itemsLoaded
          ? items.map((item) => {
              return (
                <ul key={Math.random()} className="productInfo">
                  <li key={Math.random()}>{item.towar.nazwa}</li>
                  <li key={Math.random()}>{item.towar.kategoria.nazwa}</li>
                  <li key={Math.random()}>{item.towar.producent.nazwa}</li>
                  <li key={Math.random()}>{item.towar.cenaNetto}</li>
                  <li key={Math.random()}>{item.towar.kategoria.stawkaVat}</li>
                  <li key={Math.random()}>{item.towar.cenaBrutto}</li>
                  <li key={Math.random()}>{item.ilosc}</li>
                  <button
                    key={Math.random()}
                    onClick={() => this.handleDelete(item.id)}
                  >
                    <AiOutlineClose className="false" />
                  </button>
                </ul>
              );
            })
          : null}
        {productLoaded ? (
          <ul className="productInfo">
            <li>{thatProduct.nazwa}</li>
            <li>{thatProduct.kategoria.nazwa}</li>
            <li>{thatProduct.producent.nazwa}</li>
            <li>{thatProduct.cenaNetto}</li>
            <li>{thatProduct.kategoria.stawkaVat}</li>
            <li>{thatProduct.cenaBrutto}</li>
            <input onChange={this.changeAmount} type="number" />
            <button onClick={() => this.handleConfirm()}>
              <AiOutlineCheck className="true" />
            </button>
            {/* <AiOutlineClose /> */}
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
    );
  }
}

export default OrderItems;
