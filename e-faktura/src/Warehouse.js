import "./style/Warehouse.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function ClientsList() {
  let navigate = useNavigate();
  let [productsList, setProductsListState] = useState({ productsList: [] });
  let [categoryList, setCategoryListState] = useState({ categoryList: [] });
  let [producersList, setProducersListState] = useState({ producersList: [] });
  let [costList, setCostListState] = useState({ costList: [] });
  let [loaded, setLoaded] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const respProducts = await fetch("/towary");
      const body1 = await respProducts.json();
      const respCategory = await fetch("/kategorie");
      const body2 = await respCategory.json();
      const respProducers = await fetch("/producenci");
      const body3 = await respProducers.json();
      setProductsListState({ productsList: body1 });
      setCategoryListState({ categoryList: body2 });
      setProducersListState({ producersList: body3 });
      setLoaded(true);
    };
    fetchData();
  }, []);

  function handleOnClick() {
    navigate("/magazyn/dodaj");
  }

  return (
    <div className="Warehouse">
      <aside>
        <button onClick={handleOnClick}>Dodaj produkt</button>
      </aside>
      <div className="TableOfProducts">
        <h2>Towary</h2>
        <div className="row">
          <h4>Nazwa</h4>
          <h4>Ilość</h4>
          <h4>Cena netto</h4>
          <h4>Cena brutto</h4>
        </div>
        {loaded && productsList.length > 0 ? (
          productsList.map((product) => {
            return (
              <div className="row">
                <p>{product.nazwa}</p>
                <p>{product.ilosc}</p>
                <p>{product.cena}</p>
              </div>
            );
          })
        ) : productsList.length <= 0 ? (
          <h2>Brak</h2>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
}

export default ClientsList;
