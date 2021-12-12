import "./style/ClientsList.css";
import "./style/AddClient.css";
import React, { Component } from "react";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: "",
      categoryInput: "",
      producerInput: "",
      producers: [],
      categories: [],
      products: [],
      loaded: false,
    };

    this.changeName = this.changeName.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
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
    const productObject = {
      nazwa: this.state.nameInput,
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
      nameInput,
      categoryInput,
      producerInput,
      loaded,
      categories,
      producers,
    } = this.state;
    console.log(this.state.categories);
    console.log(loaded);

    return (
      <div className="ClientsList">
        <aside>
          <button>Dodaj produkt</button>
        </aside>
        <div className="AddClientForm">
          <h2>Nowy klient</h2>
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
          <button onClick={this.addProductToProductsList}>Dodaj Klienta</button>
        </div>
      </div>
    );
  }
}

export default AddProduct;
