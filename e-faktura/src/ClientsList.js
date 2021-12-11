import "./style/ClientsList.css";
import { useNavigate } from "react-router-dom";

function ClientsList() {
  let navigate = useNavigate();

  function handleOnClick() {
    navigate("/klienci/1");
  }

  return (
    <div className="ClientsList">
      <aside>
        <button onClick={handleOnClick}>Dodaj klienta</button>
      </aside>
    </div>
  );
}

export default ClientsList;
