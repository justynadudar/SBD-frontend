import "./style/Warehouse.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function ClientsList() {
  let navigate = useNavigate();
  let [productsList, setProductsListState] = useState({ productsList: [] });
  let [categoryList, setCategoryListState] = useState({ categoryList: [] });
  let [producersList, setProducersListState] = useState({ producersList: [] });
  let [loaded, setLoaded] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const respProducts = await fetch("/towary");
      const body1 = await respProducts.json();
      const respCategory = await fetch("/kategorie");
      const body2 = await respCategory.json();
      const respProducers = await fetch("/producenci");
      const body3 = await respProducers.json();
      setProductsListState(body1);
      setCategoryListState(body2);
      setProducersListState(body3);
      setLoaded(true);
    };
    fetchData();
  }, []);

  function handleOnClick() {
    navigate("/magazyn/dodaj");
  }

  return (
    <div className="Warehouse">
      {console.log(productsList)}
      <aside>
        <button onClick={handleOnClick}>Nowy produkt</button>
      </aside>
      <div className="TableOfProducts">
        <h2>Towary</h2>
        <div className="row">
          <h4>Nazwa</h4>
          <h4>Ilość</h4>
          <h4>Cena netto</h4>
          <h4>Cena brutto</h4>
        </div>
        {loaded ? (
          productsList.map((product) => {
            return (
              <div key={Math.random()} className="row">
                <p key={Math.random()}>{product.nazwa}</p>
                <p key={Math.random()}>{product.ilosc}</p>
                <p key={Math.random()}>{product.cenaNetto}</p>
                <p key={Math.random()}>{product.cenaBrutto}</p>
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
