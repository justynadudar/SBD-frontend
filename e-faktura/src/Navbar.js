import "./style/Navbar.css";
import { NavLink as Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="Navbar">
      <ul>
        <li className="logo">
          <Link exact to="/">
            E-Faktura
          </Link>
        </li>
        <li>
          <Link exact to="/faktury">
            Faktury
          </Link>
        </li>
        <li>
          <Link exact to="/magazyn">
            Magazyn
          </Link>
        </li>
        <li>
          <Link to="/klienci">Klienci</Link>
        </li>
        <li>
          <Link to="/pracownicy">Konto</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
