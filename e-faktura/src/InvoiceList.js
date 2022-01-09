import "./style/InvoiceList.css";
import { useNavigate, Link  } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { MdReadMore } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { Table } from "react-bootstrap";
import { AiOutlineCheck } from "react-icons/ai";

function InvoiceList() {
  let navigate = useNavigate();
  let [invoiceList, setInvoiceListState] = useState({ invoiceList: [] });
  let [loaded, setLoaded] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/faktury");
      const body = await response.json();
      setInvoiceListState(body);
      setLoaded(true);
    };
    fetchData();
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:8080/faktury/${id}`, { method: "DELETE" }).then(
      () => console.log("Delete successful")
    );
  }

  function handlePayment(id) {
    fetch(`http://localhost:8080/faktury/oplacona/${id}`, { method: "PUT" }).then(
      () => console.log("State changed successful")
    );
  }

  return (
    <div className="InvoiceList">
      <aside>
      </aside>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Id faktury</th>
            <th>Id pracownika</th>
            <th>Nabywca</th>
            <th>Suma brutto</th>
            <th>Suma netto</th>
            <th>Maksymalny termin zapłaty</th>
            <th>Data zarejestrowania zapłaty</th>

            <th>Zamówienia</th>
            <th>Zatwierdź wpłatę</th>
            <th>Usuń</th>
          </tr>
        </thead>
        <tbody>
          {loaded ? (
            invoiceList.map((invoice) => {
              return (
                <tr>
                  <td key={Math.random()}>{invoice.idFaktury}</td>
                  <td></td>
                  <td></td>
                  <td key={Math.random()}>{invoice.kwotaBrutto.toFixed(2)}</td>
                  <td key={Math.random()}>{invoice.kwotaNetto.toFixed(2)}</td>
                  <td key={Math.random()}>{invoice.maxDataRealizacji}</td>
                  {invoice?.dataRealizacji === null ? (
                    <td>NIEOPLACONA</td>
                  ) : (
                    <td>{invoice.dataRealizacji}</td>
                  )}

                  <td>
                      <Link
                      to={{
                        pathname: `/faktury/zamowienia/${invoice.idFaktury}`,
                        state: { modal: true },
                      }}
                    >
                      <MdReadMore />
                      </Link>
                  </td>
                  {invoice?.czyWszystkieZamowieniaZrealizowane === false ? (
                    <td>CZEKA NA REALIZACJĘ ZAMÓWIEŃ</td>
                  ) : (
                    <td>{" "}
                    <button
                      key={Math.random()}
                      onClick={() => handlePayment(invoice.idFaktury)}
                    >
                      <AiOutlineCheck className="false" />
                    </button></td>
                  )}
                  {/* <td>
                    {" "}
                    <button
                      key={Math.random()}
                      onClick={() => handlePayment(invoice.idFaktury)}
                    >
                      <AiOutlineCheck className="false" />
                    </button>
                  </td> */}
                  <td>
                    {" "}
                    <button
                      key={Math.random()}
                      onClick={() => handleDelete(invoice.idFaktury)}
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

export default InvoiceList;
