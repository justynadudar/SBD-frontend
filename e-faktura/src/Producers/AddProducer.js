import "../style/ProducersList.css";
import "../style/AddProducer.css";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import Error from "../Error";

class AddProducer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: "",
      producers: [],

      emptyNameField: false,
      producerAdded: false,
      show: false,
      navigate: false,
      existingProducer: false,
    };
    this.changeName = this.changeName.bind(this);
    this.addProducerToProducersList =
      this.addProducerToProducersList.bind(this);
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
    if (this.state.emptyNameField) {
      this.setState({
        emptyNameField: false,
      });
    }
    if (this.state.existingProducer) {
      this.setState({
        existingProducer: false,
      });
    }
    this.setState({
      nameInput: e.target.value,
    });
  }
  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  async addProducerToProducersList() {
    if (this.state.nameInput.length === 0) {
      this.setState({
        emptyNameField: true,
      });
    } else if (
      this.state.producers.find(
        (producer) => producer.nazwa == this.state.nameInput
      )
    ) {
      this.setState({
        existingProducer: true,
      });
    } else {
      const producerObject = {
        nazwa: this.state.nameInput,
      };

      await this.props.addProducer(producerObject);

      this.setState({
        producerAdded: true,
        show: true,
      });
    }
  }

  render() {
    const {
      nameInput,
      emptyNameField,
      producerAdded,
      show,
      navigate,
      existingProducer,
    } = this.state;
    return (
      <div className="ProducersList">
        <aside>
          <button onClick={() => this.setState({ navigate: true })}>
            {navigate ? <Navigate to="/producenci" /> : null}
            Powrót
          </button>
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
              <Error
                error={emptyNameField}
                info="Pole nazwa nie może być puste!"
              />
              <Error
                error={existingProducer}
                info="Producent o takiej nazwie już istnieje!"
              />
            </div>
          </div>
          <button onClick={this.addProducerToProducersList}>
            Dodaj Producenta
          </button>
          {producerAdded ? (
            <Modal show={show} onHide={this.handleClose}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                Producent o nazwie {nameInput} został dodany
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  OK
                  {show ? null : <Navigate to="/producenci" />}
                </Button>
              </Modal.Footer>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default AddProducer;
