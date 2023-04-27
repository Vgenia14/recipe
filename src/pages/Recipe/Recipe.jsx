import React, { useRef, useState } from "react";
import "./Recipe.css";
import { useContext } from "react";
import { AuthContext } from "../../context/context";
import { Link, useParams } from "react-router-dom";
import { projectFirestore } from "../../firebase/firebase";
import { useEffect } from "react";

// import { ContextColor } from "../context/context";

export default function Recipe() {
  const [document, setDocument] = useState(null);
  const [setError] = useState(null);
  const context = useContext(AuthContext);
  const container = useRef(null);
  const { id } = useParams();

  const getDocument = (id) => {
    projectFirestore.collection("rezepten").doc(id).onSnapshot(
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        } else {
          setError("Project doesn't exist");
        }
      },
      (err) => {
        setError(err.message);
      }
    );
  };

  useEffect(() => {
    getDocument(id);
  }, []);

  console.log(document);

  // console.log(document.ingridients);
  return (
    <div className="container_rightBoard" ref={container}>
      {document && (
        <div className="box_r">
          <div>
            {context.user && <span>mein</span>}
            <span></span>
          </div>
          <div className="name_ricipe">
            <p>{document.name}</p>
          </div>
          <img src={document.photoURL} alt={document.name} />
          <div className="ingridients">
            <p>ZUTATEN</p>
            {document.ingridients && (
              <ul>
                {document.ingridients.map((item, i) => (
                  <li key={i}>
                    {item.ingridient} {item.number} {item.unit}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="box_description">
            <p>ZUBEREITUNG</p>
            <p>{document.description}</p>
          </div>
          <div className="buttons">
            <button>zu Menü für Woche hinzufügen</button>
            <br />
            <button>
              <Link to="/createRezept">redaktieren</Link>
            </button>
            <br />
            <button>entfernen von meinen Rezepten</button>
          </div>
        </div>
      )}
      {/* {!document && (
        <div>deine Rezepte</div>)} */}
    </div>
  );
}
