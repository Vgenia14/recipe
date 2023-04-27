import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

export default function notFound() {
  return (
    <div className="notFound">
      <p>404 SORRY, diese Seite ist nicht gefunden</p>
      <Link to="/">zur Startseite</Link>
    </div>
  );
}
