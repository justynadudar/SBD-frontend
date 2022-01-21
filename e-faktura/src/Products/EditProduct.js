import "../style/ProductsList.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function EditProduct() {
  let navigate = useNavigate();
  let [products, setProductsState] = useState({ products: [] });
  let [productNameInput, setProductNameState] = useState({
    productNameInput: "-",
  });
  let [loaded, setLoaded] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const respProducts = await fetch("/towary");
      const body1 = await respProducts.json();
      setProductsState(body1);
      setLoaded(true);
    };
    fetchData();
  }, []);

  function changeProduct(e) {
    if (e.target.value === "-") {
      setProductNameState({ productNameInput: e.target.value });
    } else {
      setProductNameState({
        productNameInput: products.find(
          (product) => product.nazwa == e.target.value
        ),
      });
      console.log(products);
    }
  }

  function handleOnClick() {
    navigate("/magazyn/dodaj");
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
        </div>
        <select name="name" value={productNameInput} onChange={changeProduct}>
          <option key={Math.random()}>{""}</option>
          {loaded
            ? products.map((product) => (
                <option key={Math.random()}>{product.nazwa}</option>
              ))
            : null}
        </select>
      </div>
    </div>
  );
}

export default EditProduct;
