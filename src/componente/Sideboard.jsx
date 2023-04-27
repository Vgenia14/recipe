import React from "react";
import { Link } from "react-router-dom";
import "./Sideboard.css";
// import { ContextColor } from "../context/context";

export default function Sideboard() {
// const color = useContext(ContextColor);

  return (
    <div className="container_sideboard">
      <div className="box_sideboard">
        <label>
          Suche nach Rezeptname
          <br />
          <input type="text" placeholder="Rezeptname" />
        </label>
        <div className="box_Kategorien">
          <p>Kategorien</p>
          <ul>
            <li>
              SUPPEN
              <ul>
                <li>Suppenpüree</li>
                <li>Gemüsesuppe</li>
              </ul>
            </li>
            <li>
              SALATE
              <ul>
                <li>Gemüsesuppe</li>
                <li>Meeresefrüchtesalat</li>
              </ul>
            </li>
          </ul>
        </div>
        <div>
          <button>
            <Link to="/createRezept"> Rezept erstellen</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
