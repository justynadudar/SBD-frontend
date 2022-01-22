import "../style/InvoiceList.css";
import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { MdReadMore } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { Table } from "react-bootstrap";
import { AiOutlineCheck } from "react-icons/ai";
import { Modal, Button } from "react-bootstrap";

function InvoiceList({ deleteInvoice }) {
  let navigate = useNavigate();
  let [invoiceList, setInvoiceListState] = useState({ invoiceList: [] });
  let [loaded, setLoaded] = useState("");
  let [show, setShow] = useState(false);
  let [deletedProductId, setId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/faktury");
      const body = await response.json();
      setInvoiceListState(body);
      setLoaded(true);
    };
    fetchData();
  }, []);

  async function handleDelete(id) {
    await deleteInvoice(id).then(() => {
      setShow(false);
      const fetchData = async () => {
        const response = await fetch("/faktury");
        const body = await response.json();
        setInvoiceListState(body);
        setLoaded(true);
      };
      fetchData();
    });
  }

  function handleClose() {
    setShow(false);
  }

  function handlePayment(id) {
    fetch(`http://localhost:8080/faktury/oplacona/${id}`, {
      method: "PUT",
    }).then(() => {
      console.log("State changed successful");
      const fetchData = async () => {
        const response = await fetch("/faktury");
        const body = await response.json();
        setInvoiceListState(body);
        setLoaded(true);
      };
      fetchData();
    });
  }

  return (
    <div className="InvoiceList">
      <aside></aside>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Id faktury</th>
            <th>Suma netto</th>
            <th>Suma brutto</th>
            {/* <th>Maksymalny termin zapłaty</th> */}
            <th>Data zarejestrowania zapłaty</th>

            <th>Zatwierdź wpłatę</th>
            <th>Zamówienia</th>
            <th>Usuń</th>
          </tr>
        </thead>
        <tbody>
          {loaded ? (
            invoiceList.map((invoice) => {
              return (
                <tr>
                  <td key={Math.random()}>{invoice.idFaktury}</td>
                  <td key={Math.random()}>{invoice.kwotaNetto.toFixed(2)}</td>
                  <td key={Math.random()}>{invoice.kwotaBrutto.toFixed(2)}</td>
                  {/* <td key={Math.random()}>{invoice.maxDataRealizacji}</td> */}
                  {invoice?.dataRealizacji === null ? (
                    <td>Nieopłacona</td>
                  ) : (
                    <td>{invoice.dataRealizacji.slice(0, 10)}</td>
                  )}
                  {invoice?.czyWszystkieZamowieniaZrealizowane === false ? (
                    <td>Czeka na realizację wszystkich zamówień</td>
                  ) : invoice?.dataRealizacji === null ? (
                    <td>
                      {" "}
                      <button
                        className="btn btn-outline-success"
                        key={Math.random()}
                        onClick={() => handlePayment(invoice.idFaktury)}
                      >
                        <AiOutlineCheck className="false" />
                      </button>
                    </td>
                  ) : (
                    <td>Opłacona</td>
                  )}

                  <td>
                    <Link
                      to={{
                        pathname: `/faktury/zamowienia/${invoice.idFaktury}`,
                        state: { modal: true },
                      }}
                    >
                      Szczegóły
                    </Link>
                  </td>
                  {invoice?.dataRealizacji === null ? (
                    <td>
                      <button
                        className="false btn-close btn-close-black "
                        key={Math.random()}
                        onClick={() => {
                          setShow(true);
                          setId(invoice.idFaktury);
                        }}
                      ></button>
                    </td>
                  ) : (
                    <td></td>
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
          <Modal.Body>Czy napewno chcesz usunąć tą fakturę?</Modal.Body>
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

export default InvoiceList;
