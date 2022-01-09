import "./style/OrderItem.css";
import React, { Component } from "react";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { ListGroup, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import Error from "./Error";

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
      wrongAmount: false,
      editClicked: false,
    };

    this.changeProduct = this.changeProduct.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
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
      wrongAmount: false,
    });
    this.setState({
      amountInput: e.target.value,
    });
  }

  handleConfirm() {
    if (
      this.state.amountInput <= 0 ||
      this.state.amountInput > this.state.thatProduct.ilosc
    ) {
      this.setState({
        wrongAmount: true,
      });
    } else {
      this.setState({
        wrongAmount: false,
      });
      window.scrollBy(0, 200);
      const newItem = {
        id: this.state.itemId,
        towar: this.state.thatProduct,
        ilosc: parseInt(this.state.amountInput),
      };

      this.state.products.map((item) => {
        console.log(item);
      });
      // this.state.items.filter(
      //   (item) => item.towar.idProduktu !== this.state.thatProduct.idProduktu
      // )

      this.setState({
        items: [...this.state.items, newItem],
        itemsLoaded: true,
        products: this.state.products.filter(
          (item) => item.idTowaru !== this.state.thatProduct.idTowaru
        ),
        thatProduct: {},
        productNameInput: "",
        productLoaded: false,
        id: this.state.itemId++,
      });
      this.props.confirmItem(newItem, -1);
    }
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

  handleEdit(item, id) {
    if (
      this.state.amountInput <= 0 ||
      this.state.amountInput > item.towar.ilosc
    ) {
      this.setState({
        wrongAmount: true,
      });
    } else {
      const newItem = {
        id: id,
        towar: item,
        ilosc: parseInt(this.state.amountInput),
      };
      console.log(this.state.items.filter((item) => item.idProduktu !== id));
      this.setState({
        items: this.state.items.map((item) => {
          if (item.id == id) {
            item.ilosc = this.state.amountInput;
            console.log(item);
          }
          return item;
        }),
        itemsLoaded: true,
        thatProduct: {},
        productNameInput: "",
        productLoaded: false,

        editClicked: false,
      });
      this.props.confirmItem(newItem, id);
    }
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
      wrongAmount,
      editClicked,
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
                    className="productInfo"
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
                  </ListGroup>
                  {editClicked ? (
                    <div className="productLoaded2">
                      <input
                        onChange={this.changeAmount}
                        type="number"
                        value={amountInput}
                        className="countInput form-control"
                        min="0"
                        max={thatProduct.ilosc}
                      />{" "}
                      <button onClick={() => this.handleEdit(item, item.id)}>
                        {" "}
                        <AiOutlineCheck className="true" />
                      </button>
                    </div>
                  ) : (
                    <div className="productLoaded2">
                      <ListGroup.Item
                        onClick={() => this.setState({ editClicked: true })}
                      >
                        {item.ilosc}
                      </ListGroup.Item>

                      <button
                        key={Math.random()}
                        onClick={() => this.handleDelete(item.id)}
                      >
                        <AiOutlineClose className="false" />
                      </button>
                    </div>
                  )}
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
                min="0"
                max={thatProduct.ilosc}
              />{" "}
              <button onClick={() => this.handleConfirm()}>
                {" "}
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
        <Error error={wrongAmount} info={`Podana ilość jest nieprawidłowa `} />
        <Form.Select
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
        </Form.Select>
      </div>
    );
  }
}

export default OrderItems;
