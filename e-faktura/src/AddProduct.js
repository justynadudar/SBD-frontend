import "./style/Warehouse.css";
import "./style/AddProduct.css";
import React, { Component } from "react";

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
    };

    this.changeName = this.changeName.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.changeCost = this.changeCost.bind(this);
    this.changeProducer = this.changeProducer.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.addProductToProductsList = this.addProductToProductsList.bind(this);
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
    this.setState({
      nameInput: e.target.value,
    });
  }
  changeAmount(e) {
    this.setState({
      amountInput: e.target.value,
    });
  }
  changeCost(e) {
    this.setState({
      costInput: e.target.value,
    });
  }

  changeCategory(e) {
    this.setState({
      categoryInput: e.target.value,
    });
  }

  changeProducer(e) {
    this.setState({
      producerInput: e.target.value,
    });
  }

  async addProductToProductsList() {
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
      nameInput,
      amountInput,
      costInput,
      categoryInput,
      producerInput,
      loaded,
      categories,
      producers,
    } = this.state;

    return (
      <div className="Warehouse">
        <aside>
          <button>Dodaj produkt</button>
        </aside>
        <div className="AddProductForm">
          <h2>Nowy produkt</h2>
          <div className="nextLineToAdd">
            <div className="inputContainer">
              <p>Nazwa produktu</p>
              <input
                type="text"
                name="name"
                value={nameInput}
                onChange={this.changeName}
              />
            </div>
            <div className="inputContainer">
              <p>Ilość</p>
              <input
                type="number"
                name="amount"
                value={amountInput}
                onChange={this.changeAmount}
              />
            </div>
            <div className="inputContainer">
              <p>Cena netto</p>
              <input
                type="number"
                name="cost"
                value={costInput}
                onChange={this.changeCost}
              />
            </div>
          </div>
          <div className="nextLineToAdd">
            <div className="inputContainer">
              <p>Kategoria</p>
              <input
                type="text"
                list="categories"
                name="category"
                value={categoryInput}
                onChange={this.changeCategory}
              />
              <datalist id="categories">
                {loaded
                  ? categories.map((category) => (
                      <option key={Math.random()}>{category.nazwa}</option>
                    ))
                  : null}
              </datalist>
            </div>
            <div className="inputContainer">
              <p>Producent</p>
              <input
                type="text"
                list="producers"
                name="producer"
                value={producerInput}
                onChange={this.changeProducer}
              />
              <datalist id="producers">
                {loaded
                  ? producers.map((producer) => (
                      <option key={Math.random()}>{producer.nazwa}</option>
                    ))
                  : null}
              </datalist>
            </div>
          </div>
          <button onClick={this.addProductToProductsList}>Dodaj produkt</button>
        </div>
      </div>
    );
  }
}

export default AddProduct;
