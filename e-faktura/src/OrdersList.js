import "./style/OrdersList.css";
import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { MdReadMore } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { Table } from "react-bootstrap";

function OrdersList({ orders }) {
  let navigate = useNavigate();
  let [ordersList, setOrdersListState] = useState({ ordersList: [] });
  let [loaded, setLoaded] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/zamowienia");
      const body = await response.json();
      setOrdersListState(body);
      setLoaded(true);
    };
    fetchData();
  }, []);

  function handleOnClick() {
    const orderObject = {};
    // fetch(`http://localhost:8080/zamowienia`, {
    //   method: "POST", // or 'PUT'
    //   headers: {
    //     "content-type": "application/json",
    //     Accept: "application/json",
    //   },
    //   body: JSON.stringify(orderObject),
    // })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
    navigate("/zamowienia/dodaj");
  }

  function handleDelete(id) {
    fetch(`http://localhost:8080/zamowienia/${id}`, { method: "DELETE" }).then(
      () => console.log("Delete successful")
    );
  }

  function handleFinalize(id) {
    fetch(`http://localhost:8080/zamowienia/realizuj/${id}`, { method: "DELETE" }).then(
      () => console.log("Finalize successful")
    );
  }

  return (
    <div className="OrdersList">
      <aside>
        <button onClick={handleOnClick}>Nowe zamówienie</button>
      </aside>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Id</th>
            <th>Klient</th>
            <th>Pracownik</th>
            <th>Stan zamówienia</th>
            <th>Szczegóły</th>
            <th>Zrealizuj</th>
            <th>Usuń</th>
          </tr>
        </thead>
        <tbody>
          {loaded ? (
            ordersList.map((order) => {
              return (
                <tr>
                  <td>{order.idZamowienia}</td>
                  <td>{order.klient.idKlienta} {order.klient.imie} {order.klient.nazwisko}</td>
                  <td>{order.pracownik.idPracownika} {order.pracownik.imie} {order.pracownik.nazwisko}</td>
                  <td>{order.stanZamowienia}</td>
                  <td if="{order.stanZamowienia} == 'W_REALIZACJI'">
                      <Link
                      to={{
                        pathname: `/pozycje/zamowienie/${order.idZamowienia}`,
                        state: { modal: true },
                      }}
                    >
                      <MdReadMore />
                      </Link>
                  </td>
                  <td>
                    
                    <button
                      key={Math.random()}
                      onClick={() => handleFinalize(order.idZamowienia)}
                    >
                      <AiOutlineCheck className="false" />
                    </button>
                  </td>
                  <td>
                    <button
                      key={Math.random()}
                      onClick={() => handleDelete(order.idZamowienia)}
                    >
                      <AiOutlineClose className="false" />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <h2>Loading...</h2>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default OrdersList;
