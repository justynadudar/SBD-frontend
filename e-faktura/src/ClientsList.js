import "./style/ClientsList.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function ClientsList({ clients }) {
  let navigate = useNavigate();
  let [clientsList, setClientsListState] = useState({ clientsList: [] });
  let [loaded, setLoaded] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/klienci");
      const body = await response.json();
      setClientsListState(body);
      setLoaded(true);
    };
    fetchData();
  }, []);

  function handleOnClick() {
    navigate("/klienci/1");
  }

  return (
    <div className="ClientsList">
      <aside>
        <button onClick={handleOnClick}>Dodaj klienta</button>
      </aside>
      <div className="TableOfClients">
        <h2>Klienci</h2>
        <div className="row">
          <h4>Imie</h4>
          <h4>Nazwisko</h4>
          <h4>Telefon</h4>
          <h4>E-mail</h4>
        </div>

        {loaded ? (
          clientsList.map((client) => {
            return (
              <div key={client.id} className="row">
                <p>{client.imie}</p>
                <p>{client.nazwisko}</p>
                <p>{client.telefon}</p>
                <p>-</p>
              </div>
            );
          })
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
}

export default ClientsList;

// import React, { Component } from "react";
// import "./style/ClientsList.css";
// import { Link } from "react-router-dom";

// class ClientList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { clients: [] };
//   }

//   componentDidMount() {
//     fetch("/klienci")
//       .then((response) => response.json())
//       .then((data) => this.setState({ clients: data }));
//   }

//   async remove(id) {
//     await fetch(`/klienci/${id}`, {
//       method: "DELETE",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//     }).then(() => {
//       let updatedClients = [...this.state.clients].filter((i) => i.id !== id);
//       this.setState({ clients: updatedClients });
//     });
//   }

//   render() {
//     const { clients, isLoading } = this.state;

//     if (isLoading) {
//       return <p>Loading...</p>;
//     }

//     return (
//       <div className="ClientsList">
//         <aside>
//           <button>
//             <Link to="/klienci/1">Dodaj klienta</Link>
//           </button>
//         </aside>
//         <div className="ClientsTable">
//           <h2>Klienci</h2>
//           <thead>
//             <tr>
//               <th>Imie</th>
//               <th>Nazwisko</th>
//               <th>Telefon</th>
//               <th>E-mail</th>
//             </tr>
//           </thead>
//           {clients.map((client) => {
//             return (
//               <tbody>
//                 <tr key={client.id}>
//                   <td>{client.imie}</td>
//                   <td>{client.nazwisko}</td>
//                   <td>{client.telefon}</td>
//                   <td>{client.nip}</td>
//                   <td>{client.kodPocztowy}</td>
//                 </tr>
//               </tbody>
//             );
//           })}
//         </div>
//       </div>
//     );
//   }
// }
// export default ClientList;
