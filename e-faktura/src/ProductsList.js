import "./style/ProductsList.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Table } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";

function ClientsList() {
  let navigate = useNavigate();
  let [productsList, setProductsListState] = useState({ productsList: [] });
  let [loaded, setLoaded] = useState("");
  let [show, setShow] = useState(false);
  let [deletedProductId, setId] = useState("");

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

  async function handleDelete(id) {
    await fetch(`http://localhost:8080/towary/${id}`, {
      method: "DELETE",
    }).then(() => {
      setShow(false);
      window.location.reload();
    });
  }

  function handleClose() {
    setShow(false);
  }

  return (
    <div className="Warehouse">
      <aside>
        <button onClick={handleOnClick}>Nowy produkt</button>
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
                      onClick={() => {
                        setShow(true);
                        setId(product.idTowaru);
                      }}
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
      {show ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>Czy napewno chcesz usunąć ten produkt?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => handleDelete(deletedProductId)}
            >
              Tak, potwierdź
              {show ? null : window.location.reload()}
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setShow(false);
              }}
            >
              Cofnij
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
    </div>
  );
}

export default ClientsList;
