import "./style/ProductsList.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Table } from "react-bootstrap";

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
    fetch(`http://localhost:8080/towary/${id}`, { method: "DELETE" }).then(() =>
      console.log("Delete successful")
    );
  }

  function handleIssuingGoodsClick() {
    navigate("/magazyn/edytuj");
  }

  return (
    <div className="Warehouse">
      <aside>
        <button onClick={handleOnClick}>Nowy produkt</button>
        {/* <button onClick={handleIssuingGoodsClick}>Wydaj towar</button> */}
      </aside>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Kategoria</th>
            <th>Producent</th>
            <th>Ilość</th>
            <th>Cena netto</th>
            <th>Cena brutto</th>

            <th>Usuń</th>
          </tr>
        </thead>
        <tbody>
          {loaded ? (
            productsList.map((product) => {
              return (
                <tr>
                  <td key={Math.random()}>{product.nazwa}</td>
                  <td key={Math.random()}>{product.kategoria.nazwa}</td>
                  <td key={Math.random()}>{product.producent.nazwa}</td>
                  <td key={Math.random()}>{product.ilosc}</td>
                  <td key={Math.random()}>{product.cenaNetto.toFixed(2)}</td>
                  <td key={Math.random()}>{product.cenaBrutto.toFixed(2)}</td>
                  <td>
                    <button
                      key={Math.random()}
                      onClick={() => handleDelete(product.idTowaru)}
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

export default ClientsList;
