import "./style/OrderItem.css";
import React, { Component } from "react";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { ListGroup } from "react-bootstrap";

//tutaj powinno byc add order item
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
    this.handleConfirm = this.handleConfirm.bind(this);
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
    window.scrollBy(0, 200);
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
    this.props.confirmItem(newItem);
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
      amountInput,
    } = this.state;

    return (
      <div className="AddItemForm">
        {itemsLoaded
          ? items.map((item) => {
              return (
                <div className="productLoaded">
                  <ListGroup
                    horizontal
                    key={Math.random()}
                    className="productInfoAccept"
                  >
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
                    <div className="productLoaded2">
                      <button
                        key={Math.random()}
                        onClick={() => this.handleDelete(item.id)}
                      >
                        <AiOutlineClose className="false" />
                      </button>
                    </div>
                  </ListGroup>
                </div>
              );
            })
          : null}
        {productLoaded ? (
          <div className="productLoaded">
            <ListGroup horizontal key={Math.random()} className="productInfo">
              <ListGroup.Item>{thatProduct.nazwa}</ListGroup.Item>
              <ListGroup.Item>{thatProduct.kategoria.nazwa}</ListGroup.Item>
              <ListGroup.Item>{thatProduct.producent.nazwa}</ListGroup.Item>
              <ListGroup.Item>{thatProduct.cenaNetto}</ListGroup.Item>
              <ListGroup.Item>{thatProduct.kategoria.stawkaVat}</ListGroup.Item>
              <ListGroup.Item>{thatProduct.cenaBrutto}</ListGroup.Item>
            </ListGroup>
            <div className="productLoaded2">
              <input
                onChange={this.changeAmount}
                type="number"
                value={amountInput}
                className="countInput form-control"
                min={0}
                max={thatProduct.ilosc}
              />
              <button onClick={() => this.handleConfirm()}>
                <AiOutlineCheck className="true" />
              </button>
            </div>
          </div>
        ) : (
          <ul className="productInfo">
            <li>{""}</li>
            <li>{""}</li>
            <li>{""}</li>
            <li>{""}</li>
            <li>{""}</li>
            <li>{""}</li>
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
