import "./style/EmployeesList.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { NavLink as Link } from "react-router-dom";

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

  return (
    <div className="EmployeesList">
      <aside>
        <button onClick={handleOnClick}>Nowy pracownik</button>
      </aside>
      <div className="TableOfEmployees">
        <h2>Pracownicy</h2>
        <div className="row">
          <h4>Id</h4>
          <h4>Imię</h4>
          <h4>Nazwisko</h4>
          <h4>Stanowisko</h4>
          <h4>Telefon</h4>
        </div>

        {loaded ? (
          employeesList.map((employee) => {
            return (
              <div key={employee.idPracownika} className="row">
                <p>{employee.idPracownika}</p>
                <p>{employee.imie}</p>
                <p>{employee.nazwisko}</p>
                <p>{employee.stanowisko.nazwa}</p>
                <p>{employee.telefon}</p>
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

export default EmployeesList;
