import React, { useEffect, useState } from "react";
import {
  Link,
} from "react-router-dom";
import "./MeineRezepte.css";
import { projectFirestore } from "../../firebase/firebase";
import { useContext } from "react";
import { AuthContext } from "../../context/context";

export default function MeineRezepte() {
  const [documentsCollection, setDocumentsCollection] = useState(null);
  const [setError] = useState(null);
  const context = useContext(AuthContext);
  // if (context.user) {
  //   console.log(context.user.uid);
  // }

  const getCollection = () => {
    projectFirestore.collection("rezepten").onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setDocumentsCollection(results);
        setError(null);
      },
      (err) => {
        setError("Could not fetch the data");
      }
    );
  };

  // const getDocument = (id) => {
  //   projectFirestore.collection("rezepten").doc(id).onSnapshot(
  //     (snapshot) => {
  //       if (snapshot.data()) {
  //         setDocument({ ...snapshot.data(), id: snapshot.id });
  //         setError(null);
  //       } else {
  //         setError("Project doesn't exist");
  //       }
  //     },
  //     (err) => {
  //       setError(err.message);
  //     }
  //   );
  // };
  // console.log(documentsCollection);
  // console.log(id);
  useEffect(() => {
    getCollection();
    // getDocument("SOVtcQRYkC9SprgQgCnh");
  }, []);

  return (
        <div className="container_myRecipe">
      {context.user && (
        
        <div className="box_myRecipe">
            <h3>meine Recepte</h3>
            {/* <ul>
              <span>SUPPEN</span>
              <li>
                <NavLink to="/">Suppenpüree</NavLink>
              </li>
              <li>
                <NavLink to="/Gemüsesuppe">Gemüsesuppe</NavLink>
              </li>
            </ul> */}
            <div className="containerCard">
              {/* <div className="button_moov">zur</div> */}

              {documentsCollection?.map(
                (recipe) =>
                  context.user.uid === recipe.user && (
                    <Link to={`${recipe.id}`} key={recipe.id}>
                      <div className="box_card">
                        <h3>{recipe.name}</h3>
                        <p className="rezension"></p>
                        <img src={recipe.photoURL} alt={recipe.name} />
                        <p>{recipe.category}</p>
                        <p>
                          {recipe.ingridients.map((ingr, i) => (
                            <span key={i}>
                              {ingr.ingridient} {ingr.number}
                              {ingr.unit},
                            </span>
                          ))}
                        </p>
                        <button>menü</button>
                        <button>red</button>
                        <button>del</button>
                      </div>
                    </Link>
                  )
              )}
              {/* <div className="button_moov">weit</div> */}
            </div>
          </div>
      )}
     
        </div>
  );
}
