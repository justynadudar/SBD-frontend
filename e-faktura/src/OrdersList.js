import "./style/OrdersList.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { NavLink as Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
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

  return (
    <div className="OrdersList">
      <aside>
        <button onClick={handleOnClick}>Nowe zamówienie</button>
      </aside>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Id</th>
            <th>Id klienta</th>
            <th>Id pracownika</th>
            <th>Stan zamówienia</th>
            <th>Szczegóły</th>
            <th>Usuń</th>
          </tr>
        </thead>
        <tbody>
          {loaded ? (
            ordersList.map((order) => {
              return (
                <tr>
                  <td>{order.idZamowienia}</td>
                  <td>{order.klient.idKlienta}</td>
                  <td>{order.pracownik.idPracownika}</td>
                  <td>{order.stanZamowienia}</td>
                  <td>
                    <Link
                      to={{
                        pathname: `/pozycje/zamowienie/${order.idZamowienia}`,
                        state: { modal: true },
                      }}
                    >
                      Szczegóły
                    </Link>
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
