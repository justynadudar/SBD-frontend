import "./style/OrdersList.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

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
    navigate("/zamowienia/dodaj");
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
          <h4>NIP klienta</h4>
          <h4>Id pracownika</h4>
          <h4>Stan zamówienia</h4>
        </div>

        {loaded ? (
          ordersList.map((order) => {
            return (
              <div key={order.idZamowienia} className="row">
                <p>{order.idZamowienia}</p>
                <p>{order.klient.nip}</p>
                <p>{order.pracownik.idPracownika}</p>
                <p>{order.stanZamowienia}</p>
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
