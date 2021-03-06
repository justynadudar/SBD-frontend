import "../style/OrdersList.css";
import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";

function OrdersList({ deleteOrder }) {
  let navigate = useNavigate();
  let [ordersList, setOrdersListState] = useState({ ordersList: [] });
  let [loaded, setLoaded] = useState("");
  let [show, setShow] = useState(false);
  let [deletedId, setId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/zamowienia");
      const body = await response.json();
      setOrdersListState(body);
      setLoaded(true);
    };
    fetchData();
  }, []);

  function handleClose() {
    setShow(false);
  }

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

  async function handleDelete(id) {
    await deleteOrder(id).then(() => {
      setShow(false);
      const fetchData = async () => {
        const response = await fetch("/zamowienia");
        const body = await response.json();
        setOrdersListState(body);
        setLoaded(true);
      };
      fetchData();
    });
  }

  function handleInRealization(id) {
    fetch(`http://localhost:8080/zamowienia/w-realizacji/${id}`, {
      method: "PUT",
    }).then(() => {
      console.log("Order sent to realization successful");
      const fetchData = async () => {
        const response = await fetch("/zamowienia");
        const body = await response.json();
        setOrdersListState(body);
        setLoaded(true);
      };
      fetchData();
    });
  }

  function handleToPay(id) {
    fetch(`http://localhost:8080/zamowienia/do-zaplaty/${id}`, {
      method: "PUT",
    }).then(() => {
      console.log("Order waiting for payment");
      const fetchData = async () => {
        const response = await fetch("/zamowienia");
        const body = await response.json();
        setOrdersListState(body);
        setLoaded(true);
      };
      fetchData();
    });
  }

  return (
    <div className="OrdersList">
      <aside>
        <button onClick={handleOnClick}>Nowe zam??wienie</button>
      </aside>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Id</th>
            <th>Id faktura</th>
            <th>Klient</th>
            <th>Pracownik realizuj??cy</th>
            <th>Stan zam??wienia</th>
            <th>Zmie?? stan</th>
            <th>Kwota netto</th>
            <th>Kwota brutto</th>
            <th>Szczeg????y</th>
            <th>Usu??</th>
          </tr>
        </thead>
        <tbody>
          {loaded ? (
            ordersList.map((order) => {
              return (
                <tr>
                  <td>{order.idZamowienia}</td>
                  <td>{order.faktura.idFaktury}</td>
                  <td>
                    {order.klient.idKlienta} {order.klient.imie}{" "}
                    {order.klient.nazwisko}
                  </td>
                  <td>
                    {order.pracownik.idPracownika} {order.pracownik.imie}{" "}
                    {order.pracownik.nazwisko}
                  </td>
                  <td>{order.stanZamowienia}</td>
                  <td>
                    {order.stanZamowienia === "DO_REALIZACJI" ? (
                      <button
                        key={Math.random()}
                        onClick={() => handleInRealization(order.idZamowienia)}
                      >
                        Rozpocznij realizacj??
                      </button>
                    ) : order.stanZamowienia === "W_REALIZACJI" ? (
                      <button
                        key={Math.random()}
                        onClick={() => handleToPay(order.idZamowienia)}
                      >
                        Zako??cz realizacj??
                      </button>
                    ) : order.stanZamowienia === "DO_OPLATY" ? (
                      <p>Czeka na op??at??</p>
                    ) : order.stanZamowienia === "OPLACONE" ? (
                      <p>Op??acone</p>
                    ) : order.stanZamowienia === "ANULOWANE" ? (
                      <p>Anulowane</p>
                    ) : null}
                  </td>
                  <td>{order.kwotaNetto.toFixed(2)}</td>
                  <td>{order.kwotaBrutto.toFixed(2)}</td>
                  <td>
                    <Link
                      to={{
                        pathname: `/pozycje/zamowienie/${order.idZamowienia}`,
                        state: { modal: true },
                      }}
                    >
                      Szczeg????y
                    </Link>
                  </td>
                  {order?.stanZamowienia === "OPLACONE" ? (
                    <td></td>
                  ) : (
                    <td>
                      {" "}
                      <button
                        className="false btn-close btn-close-black "
                        key={Math.random()}
                        onClick={() => {
                          setShow(true);
                          setId(order.idZamowienia);
                        }}
                      ></button>
                    </td>
                  )}
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
          <Modal.Body>Czy napewno chcesz usun???? to zam??wienie?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleDelete(deletedId)}>
              Tak, potwierd??
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

export default OrdersList;
