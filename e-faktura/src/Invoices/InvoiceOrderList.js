import "../style/InvoiceOrderList.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Table } from "react-bootstrap";

function InvoiceOrderList({ orders }) {
  const { id } = useParams();
  let navigate = useNavigate();
  let [ordersList, setOrdersListState] = useState({ ordersList: [] });
  let [loaded, setLoaded] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/faktury/zamowienia/" + id);
      const body = await response.json();
      setOrdersListState(body);
      setLoaded(true);
    };
    fetchData();
  }, []);

  function handleOnClick() {
    navigate("/faktury/" + id);
  }

  //   function handleDelete(id) {
  //     fetch(`http://localhost:8080/pozycje/${id}`, { method: 'DELETE' })
  //         .then(() => console.log('Delete successful'));
  //   }

  return (
    <div className="InvoiceOrderList">
      <aside>
        <button onClick={handleOnClick}>Powrót</button>
      </aside>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nabywca</th>
            <th>Pracownik realizujący</th>
            <th>Stan zamowienia</th>
            <th>Kwota netto</th>
            <th>Kwota brutto</th>

            <th>Szczegóły</th>
          </tr>
        </thead>
        <tbody>
          {loaded ? (
            ordersList.map((order) => {
              return (
                <tr>
                  <td key={Math.random()}>{order.idZamowienia}</td>
                  <td key={Math.random()}>
                    {order.klient.idKlienta} {order.klient.imie}{" "}
                    {order.klient.nazwisko}
                  </td>
                  <td key={Math.random()}>
                    {order.pracownik.idPracownika} {order.pracownik.imie}{" "}
                    {order.pracownik.nazwisko}
                  </td>
                  <td key={Math.random()}>{order.stanZamowienia}</td>
                  <td key={Math.random()}>{order.kwotaNetto.toFixed(2)}</td>
                  <td key={Math.random()}>{order.kwotaBrutto.toFixed(2)}</td>
                  <td>
                    <Link
                      to={{
                        pathname: `/pozycje/zamowienie/${order.idZamowienia}`,
                        state: { modal: true },
                      }}
                    >
                      Szczegóły
                    </Link>
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

export default InvoiceOrderList;
