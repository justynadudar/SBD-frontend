import "./style/InvoiceList.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
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

  function handleOnClick() {
    navigate("/faktury/dodaj");
  }

  function handleDelete(id) {
    fetch(`http://localhost:8080/faktury/${id}`, { method: "DELETE" }).then(
      () => console.log("Delete successful")
    );
  }

  function handlePayment(id) {
    fetch(`http://localhost:8080/faktury/mark-paid/${id}`, { method: "PUT" }).then(
      () => console.log("State changed successful")
    );
  }

  return (
    <div className="InvoiceList">
      <aside>
        <button onClick={handleOnClick}>Nowa faktura</button>
      </aside>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Id faktury</th>
            <th>Id pracownika</th>
            <th>Rzeczywisty termin zapłaty</th>
            <th>Ostateczny termin zapłaty</th>
            <th>Suma brutto</th>
            <th>Suma netto</th>
            <th>Nabywca</th>

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
                  <td key={Math.random()}></td>
                  <td key={Math.random()}>{invoice.maxDataRealizacji}</td>
                  <td key={Math.random()}>{invoice.kwotaBrutto.toFixed(2)}</td>
                  <td key={Math.random()}>{invoice.kwotaNetto.toFixed(2)}</td>
                  <td></td>
                  <td>
                    {" "}
                    <button
                      key={Math.random()}
                      onClick={() => handlePayment(invoice.idFaktury)}
                    >
                      <AiOutlineCheck className="false" />
                    </button>
                  </td>
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
