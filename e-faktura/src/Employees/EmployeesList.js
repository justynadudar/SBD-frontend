import "../style/EmployeesList.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Table } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";

function EmployeesList({ deleteEmployee }) {
  let navigate = useNavigate();
  let [employeesList, setEmployeesListState] = useState({ employeesList: [] });
  let [loaded, setLoaded] = useState("");
  let [show, setShow] = useState(false);
  let [deletedProductId, setId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/pracownicy");
      const body = await response.json();
      setEmployeesListState(body);
      setLoaded(true);
    };
    fetchData();
  }, []);

  function handleOnClick() {
    navigate("/pracownicy/dodaj");
  }

  async function handleDelete(id) {
    await deleteEmployee(id).then(() => {
      setShow(false);
      const fetchData = async () => {
        const response = await fetch("/pracownicy");
        const body = await response.json();
        setEmployeesListState(body);
        setLoaded(true);
      };
      fetchData();
    });
  }

  function handleClose() {
    setShow(false);
  }

  return (
    <div className="EmployeesList">
      <aside>
        <button onClick={handleOnClick}>Nowy pracownik</button>
      </aside>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Id</th>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Stanowisko</th>
            <th>Telefon</th>
            <th>Usuń</th>
          </tr>
        </thead>
        <tbody>
          {loaded ? (
            employeesList.map((employee) => {
              return (
                <tr>
                  <td>{employee.idPracownika}</td>
                  <td>{employee.imie}</td>
                  <td>{employee.nazwisko}</td>
                  <td>{employee.stanowisko.nazwa}</td>
                  <td>{employee.telefon}</td>
                  <td>
                    <button
                      className="false btn-close btn-close-black "
                      key={Math.random()}
                      onClick={() => {
                        setShow(true);
                        setId(employee.idPracownika);
                      }}
                    ></button>
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
          <Modal.Body>Czy napewno chcesz usunąć tego pracownika?</Modal.Body>
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

export default EmployeesList;
