import "./style/InvoiceList.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

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
    fetch(`http://localhost:8080/faktury/${id}`, { method: 'DELETE' })
        .then(() => console.log('Delete successful'));
  }

  return (
    <div className="InvoiceList">
      <aside>
        <button onClick={handleOnClick}>Nowa faktura</button>
      </aside>
      <div className="TableOfInvoices">
        <h2>Wystawione faktury</h2>
        <div className="row">
          <h4>Id faktury</h4>
          {/* <h4>Id pracownika</h4>
          <h4>Data wystawienia</h4>
          <h4>Suma brutto</h4>
          <h4>Nabywca</h4> */}
        </div>

        {loaded ? (
          invoiceList.map((invoice) => {
            return (
              <div key={Math.random()} className="row">
                <p key={Math.random()}>{invoice.idFaktury}</p>
                <button
                    key={Math.random()}
                    onClick={() => handleDelete(invoice.idFaktury)}
                  >
                    <AiOutlineClose className="false" />
                  </button>
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

export default InvoiceList;
