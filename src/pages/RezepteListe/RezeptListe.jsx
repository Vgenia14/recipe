import React from "react";
import { Link } from "react-router-dom";
import "./RezeptListe.css";
// import { ContextColor } from "../../context/context";

export default function RezeptListe({ recipes }) {
  // const color = useContext(ContextColor);
  const num = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  return (
    <div className="aa">
      <h3>allgemeine Recepte </h3>
      {/*     
        <ul>
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
        {recipes &&
          recipes.map((recipe) => (
            <Link to={`${recipe.idMeal}`} key={recipe.idMeal}>
              <div className="box_card">
                <h3>{recipe.strMeal}</h3>
                <p className="rezension"></p>
                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                <p>{recipe.strCategory}</p>
                <p>
                  {num.map((n, i) => {
                    if (!recipe[`strIngredient${n}`] === "") {
                      return (
                        <span key={i}>
                          {recipe[`strIngredient${n}`]}{" "}
                          {recipe[`strMeasure${n}`]},
                        </span>
                      );
                    }
                  })}
                </p>

                {/* <div className="box_buttons"> */}
                <button>zu meinen Rezepten</button>
                {/* </div> */}
              </div>
            </Link>
          ))}
        {/* <div className="button_moov">weit</div> */}
      </div>
      {/* <RecipeIT/> */}
    </div>
  );
}
