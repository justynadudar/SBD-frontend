import "./style/OrdersList.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { NavLink as Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

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
    fetch(`http://localhost:8080/zamowienia`, {
      method: "POST", // or 'PUT'
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(orderObject),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    navigate("/zamowienia/dodaj");
  }

  function handleDelete(id) {
    fetch(`http://localhost:8080/zamowienia/${id}`, { method: 'DELETE' })
        .then(() => console.log('Delete successful'));
  }

  return (
    <div className="OrdersList">
      <aside>
        <button onClick={handleOnClick}>Nowe zamówienie</button>
      </aside>
      <div className="TableOfOrders">
        <h2>Zamówienia</h2>
        <div className="row">
          <h4>Id</h4>
          <h4>Id klienta</h4>
          <h4>Id pracownika</h4>
          <h4>Stan zamówienia</h4>
          <h4>Pozycje</h4>
        </div>

        {loaded ? (
          ordersList.map((order) => {
            return (
              <div key={order.idZamowienia} className="row">
                <p>{order.idZamowienia}</p>
                <p>{order.klient.idKlienta}</p>
                <p>{order.pracownik.idPracownika}</p>
                <p>{order.stanZamowienia}</p>
                <p>
                  <Link
                    to={{
                      pathname: `/pozycje/zamowienie/${order.idZamowienia}`,
                      state: { modal: true },
                    }}
                  >
                    Szczegóły
                  </Link>
                </p>
                <button
                    key={Math.random()}
                    onClick={() => handleDelete(order.idZamowienia)}
                  >
                    <AiOutlineClose className="false" />
                  </button>
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

export default OrdersList;
