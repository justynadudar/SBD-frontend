import "../style/ProductsList.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Table } from "react-bootstrap";
import { Modal, Button, Form } from "react-bootstrap";

function ClientsList({ deleteProduct }) {
  let navigate = useNavigate();
  let [productsList, setProductsListState] = useState({ productsList: [] });
  let [filteredProductsList, setFilteredProductsListState] = useState({
    filteredProductsList: [],
  });
  let [loaded, setLoaded] = useState("");
  let [show, setShow] = useState(false);
  let [deletedProductId, setId] = useState("");
  let [categoryInput, setCategory] = useState("");
  let [producerInput, setProducer] = useState("");
  let [categories, setCategories] = useState("");
  let [producers, setProducers] = useState("");
  let [filtered, setFiltered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const respProducts = await fetch("/towary");
      const respCategories = await fetch("/kategorie");
      const respProducers = await fetch("/producenci");
      const body1 = await respProducts.json();
      const body2 = await respCategories.json();
      const body3 = await respProducers.json();
      setProductsListState(body1);
      setCategories(body2);
      setProducers(body3);
      setLoaded(true);
    };
    fetchData();
  }, []);

  function handleOnClick() {
    navigate("/magazyn/dodaj");
  }

  function changeCategory(e) {
    setCategory(e.target.value);
    if (e.target.value == "") setFiltered(false);
    else setFiltered(true);
    setFilteredProductsListState(
      productsList.filter(
        (product) => product.kategoria.nazwa == e.target.value
      )
    );
    if (e.target.value !== "" && producerInput !== "")
      setFilteredProductsListState(
        productsList.filter(
          (product) =>
            product.kategoria.nazwa == e.target.value &&
            product.producent.nazwa == producerInput
        )
      );
  }

  function changeProducer(e) {
    setProducer(e.target.value);
    if (e.target.value == "") setFiltered(false);
    else setFiltered(true);
    setFilteredProductsListState(
      productsList.filter(
        (product) => product.producent.nazwa == e.target.value
      )
    );
    if (e.target.value !== "" && categoryInput !== "")
      setFilteredProductsListState(
        productsList.filter(
          (product) =>
            product.producent.nazwa == e.target.value &&
            product.kategoria.nazwa == categoryInput
        )
      );
  }

  async function handleDelete(id) {
    await deleteProduct(id).then(() => {
      setShow(false);
      const fetchData = async () => {
        const response = await fetch("/towary");
        const body = await response.json();
        setProductsListState(body);
        setLoaded(true);
      };
      fetchData();
    });
  }

  function handleClose() {
    setShow(false);
  }

  return (
    <div className="Warehouse">
      <aside>
        <button className="m-3" onClick={handleOnClick}>
          Nowy produkt
        </button>

        <Form.Group className="m-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Filtruj po kategorii:</Form.Label>
          <Form.Select
            className="form-control"
            value={categoryInput}
            onChange={changeCategory}
          >
            <option key={Math.random()} value={""}>
              {""}
            </option>
            {loaded
              ? categories.map((category) => (
                  <option key={Math.random()}>{category.nazwa}</option>
                ))
              : null}
          </Form.Select>
        </Form.Group>
        <Form.Group className="m-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Filtruj po producencie:</Form.Label>
          <Form.Select
            className="form-control"
            value={producerInput}
            onChange={changeProducer}
          >
            <option key={Math.random()} value={""}>
              {""}
            </option>
            {loaded
              ? producers.map((producer) => (
                  <option key={Math.random()}>{producer.nazwa}</option>
                ))
              : null}
          </Form.Select>
        </Form.Group>
      </aside>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Id</th>
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
            filtered ? (
              filteredProductsList.map((product) => {
                return (
                  <tr>
                    <td key={Math.random()}>{product.idTowaru}</td>
                    <td key={Math.random()}>{product.nazwa}</td>
                    <td key={Math.random()}>{product.kategoria.nazwa}</td>
                    <td key={Math.random()}>{product.producent.nazwa}</td>
                    <td key={Math.random()}>{product.ilosc}</td>
                    <td key={Math.random()}>{product.cenaNetto.toFixed(2)}</td>
                    <td key={Math.random()}>{product.cenaBrutto.toFixed(2)}</td>
                    <td>
                      <button
                        className="false btn-close btn-close-black "
                        key={Math.random()}
                        onClick={() => {
                          setShow(true);
                          setId(product.idTowaru);
                        }}
                      ></button>
                    </td>
                  </tr>
                );
              })
            ) : (
              productsList.map((product) => {
                return (
                  <tr>
                    <td key={Math.random()}>{product.idTowaru}</td>
                    <td key={Math.random()}>{product.nazwa}</td>
                    <td key={Math.random()}>{product.kategoria.nazwa}</td>
                    <td key={Math.random()}>{product.producent.nazwa}</td>
                    <td key={Math.random()}>{product.ilosc}</td>
                    <td key={Math.random()}>{product.cenaNetto.toFixed(2)}</td>
                    <td key={Math.random()}>{product.cenaBrutto.toFixed(2)}</td>
                    <td>
                      <button
                        className="false btn-close btn-close-black "
                        key={Math.random()}
                        onClick={() => {
                          setShow(true);
                          setId(product.idTowaru);
                        }}
                      ></button>
                    </td>
                  </tr>
                );
              })
            )
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
