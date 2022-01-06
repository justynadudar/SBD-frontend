import "./style/EmployeesList.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Table } from "react-bootstrap";

function EmployeesList({ orders }) {
  let navigate = useNavigate();
  let [employeesList, setEmployeesListState] = useState({ employeesList: [] });
  let [loaded, setLoaded] = useState("");

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

  function handleDelete(id) {
    fetch(`http://localhost:8080/pracownicy/${id}`, { method: "DELETE" }).then(
      () => console.log("Delete successful")
    );
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
                      key={Math.random()}
                      onClick={() => handleDelete(employee.idPracownika)}
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

export default EmployeesList;
