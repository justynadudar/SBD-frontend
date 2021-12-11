import "./style/ClientsList.css";
import "./style/AddClient.css";
import React, { Component } from 'react';

class AddClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameInput: "",
            surnameInput: "",
            numberInput: "",
            clients: [],
        };
        this.changeName = this.changeName.bind(this);
        this.changeSurname = this.changeSurname.bind(this);
        this.changeNumber = this.changeNumber.bind(this);
        this.addClientToClientsList = this.addClientToClientsList.bind(this);
    }

    async componentDidMount() {
            const clients = await (await fetch(`/klienci`)).json();
            this.setState({clients: clients});
    }


  changeName(e) {
    this.setState({
        nameInput: e.target.value
    }
    )
  }
  
  changeSurname(e) {
    this.setState({
        surnameInput: e.target.value
    }
    )
  }
  
  changeNumber(e) {
    this.setState({
        numberInput: e.target.value
    }
    )
  }

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch("http://localhost:8080/klienci", {
//         method: 'GET',
//         mode: 'no-cors', 
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     });
//       const body = await response.json();
//       setClientsState(body);
//     };
//     fetchData();
//   }, []);

async addClientToClientsList() {
    console.log(this.state.nameInput);
    console.log(this.state.surnameInput);
    console.log(this.state.numberInput);
    console.log(this.state.clients);

    const clientObject= {
        nip:"",
        imie:this.state.nameInput,
         kod_pocztowy:"",
         kraj:"",
         miejscowosc:"",
         nazwa_firmy:"",
         nazwisko:this.state.surnameInput,
         nr_lokalu:"",
         telefon:this.state.numberInput,
         ulica:""
    };

    await fetch('/klienci', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientObject),
    });
  }

  render(){
      const {nameInput, surnameInput, numberInput} = this.state;
      return (
    <div className="ClientsList">
      <aside>
        <button>Dodaj klienta</button>
      </aside>
      <div className="AddClientForm">
        <h2>Nowy klient</h2>
        <div className="nextLineToAdd">
          <div className="inputContainer">
            <p>Nazwa firmy</p>
            <input type="text" />
          </div>
          <div className="inputContainer">
            <p>Numer NIP</p>
            <input type="text" />
          </div>
        </div>
        <div className="nextLineToAdd">
          <div className="inputContainer">
            <p>Ulica</p>
            <input type="text" />
          </div>
          <div className="inputContainer">
            <p>Kod pocztowy</p>
            <input type="text" />
          </div>
          <div className="inputContainer">
            <p>Miejscowość</p>
            <input type="text" />
          </div>
          <div className="inputContainer">
            <p>Kraj</p>
            <input type="text" />
          </div>
        </div>
        <div className="nextLineToAdd">
          <div className="inputContainer">
            <p>Imie</p>
            <input
              type="text"
              name="name"
              value={nameInput}
              onChange={this.changeName}
            />
          </div>
          <div className="inputContainer">
            <p>Nazwisko</p>
            <input
              type="text"
              name="surname"
              value={surnameInput}
              onChange={this.changeSurname}
            />
          </div>
        </div>
        <div className="nextLineToAdd">
          <div className="inputContainer">
            <p>Telefon</p>
            <input
              type="tel"
              pattern="[0-9]{3} [0-9]{3} [0-9]{3}"
              name="phone"
              value={numberInput}
              onChange={this.changeNumber}
            />
          </div>
          <div className="inputContainer">
            <p>E-mail</p>
            <input type="text" />
          </div>
        </div>
        <button onClick={this.addClientToClientsList}>Dodaj Klienta</button>
      </div>
    </div>
  );
  }

  
}

export default AddClient;
