import "./style/ProducersList.css";
import "./style/AddProducer.css";
import React, { Component } from "react";

class AddProducer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: "",
      producers: [],
    };
    this.changeName = this.changeName.bind(this);
    this.addProducerToProducersList = this.addProducerToProducersList.bind(this);
  }

  componentDidMount() {
    fetch("/producenci", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => this.setState({ producers: data }));
  }

  changeName(e) {
    this.setState({
      nameInput: e.target.value,
    });
  }

  async addProducerToProducersList() {
    const producerObject = {
      nazwa: this.state.nameInput,
    };

    fetch(`http://localhost:8080/producenci`, {
      method: "POST", // or 'PUT'
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(producerObject),
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
    } = this.state;
    return (
      <div className="ProducersList">
        <aside>
          <button>Dodaj producenta</button>
        </aside>
        <div className="AddProducerForm">
          <h2>Nowy producent</h2>
          <div className="nextLineToAdd">
            <div className="inputContainer">
              <p>Nazwa</p>
              <input
                type="text"
                name="name"
                value={nameInput}
                onChange={this.changeName}
              />
            </div>
          </div>
          <button onClick={this.addProducerToProducersList}>Dodaj Producenta</button>
        </div>
      </div>
    );
  }
}

export default AddProducer;
