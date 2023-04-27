import React from "react";
import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
// import { ContextColor } from "../context/context";
import "./Nav.css";
import { AuthContext } from "../context/context";
import { projectAuth} from "../firebase/firebase";

export default function Nav() {
  const context = useContext(AuthContext);
 
   const [setError] = useState(null);
  // const color = useContext(ContextColor);
      const logout = async () => {
        setError(null);
        try {
          await projectAuth.signOut();
          context.dispatch({ type: "LOGOUT" });
        } catch (err) {
          setError(err.message);
        }
      };
      const handleLogout = (e) => {
        e.preventDefault();
        logout();
      };
  return (
    <div className="box_nav_main">
      <div
        className="container_nav"
        // style={{ background: `${color.colorBackgraund}` }}
      >
        <div className="box_logo">
          <img src="" alt="" />
          <h1>
            <Link to="/">kochPLANER</Link>
          </h1>
        </div>

        <ul className="box_menü">
          <li>
            <NavLink to="/">allgemeine Rezepte</NavLink>
          </li>
          <li>
            <NavLink to="/meineRezepte">meine Rezepte</NavLink>
          </li>
          <li>
            <NavLink to="/menü_für_Woche">menü für Woche</NavLink>
          </li>
        </ul>

        <ul className="box_login">
          <li>
            <Link className="einkaufsListe">Einkaufsliste</Link>
          </li>
          {context.user && (
            <div className="isGelogged">
              <li>{context.user.displayName}</li>
              <button onClick={handleLogout}>logout</button>
            </div>
          )}
          {!context.user && (
            <li className="notGelogged">
              <Link to="/LoginUser" className="login">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
