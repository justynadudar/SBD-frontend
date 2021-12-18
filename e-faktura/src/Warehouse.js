import "./style/Warehouse.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

function ClientsList() {
  let navigate = useNavigate();
  let [productsList, setProductsListState] = useState({ productsList: [] });
  let [loaded, setLoaded] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const respProducts = await fetch("/towary");
      const body1 = await respProducts.json();
      setProductsListState(body1);
      setLoaded(true);
    };
    fetchData();
  }, []);

  function handleOnClick() {
    navigate("/magazyn/dodaj");
  }
  function handleDelete(id) {
    alert(id);
    fetch(`http://localhost:8080/towary/${id}`, { method: 'DELETE' })
        .then(() => console.log('Delete successful'));
  }

  function handleIssuingGoodsClick() {
    navigate("/magazyn/edytuj");
  }

  return (
    <div className="Warehouse">
      <aside>
        <button onClick={handleOnClick}>Nowy produkt</button>
        <button onClick={handleIssuingGoodsClick}>Wydaj towar</button>
      </aside>
      <div className="TableOfProducts">
        <h2>Towary</h2>
        <div className="row">
          <h4>Nazwa</h4>
          <h4>Kategoria</h4>
          <h4>Producent</h4>
          <h4>Ilość</h4>
          <h4>Cena netto</h4>
          <h4>Cena brutto</h4>
          <h4>Usuń</h4>
        </div>
        {loaded ? (
          productsList.map((product) => {
            return (
              <div key={Math.random()} className="row">
                <p key={Math.random()}>{product.nazwa}</p>
                <p key={Math.random()}>{product.kategoria.nazwa}</p>
                <p key={Math.random()}>{product.producent.nazwa}</p>
                <p key={Math.random()}>{product.ilosc}</p>
                <p key={Math.random()}>{product.cenaNetto.toFixed(2)}</p>
                <p key={Math.random()}>{product.cenaBrutto.toFixed(2)}</p>
                <button
                    key={Math.random()}
                    onClick={() => handleDelete(product.idTowaru)}
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

export default ClientsList;
