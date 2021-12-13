import "./style/Navbar.css";
import { NavLink as Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="Navbar">
      <ul>
        <li className="logo">
          <Link to="/">E-Faktura</Link>
        </li>
        <li>
          <Link to="/zamowienia">Zamówienia</Link>
        </li>
        <li>
          <Link to="/faktury">Faktury</Link>
        </li>
        <li>
          <Link to="/magazyn">Magazyn</Link>
        </li>
        <li>
          <Link to="/klienci">Klienci</Link>
        </li>
        <li>
          <Link to="/pracownicy">Pracownicy</Link>
        </li>
        <li>
          <Link to="/producenci">Producenci</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
