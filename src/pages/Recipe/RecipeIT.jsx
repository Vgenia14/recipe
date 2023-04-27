import React from "react";
import { useParams } from "react-router-dom";
import "./RecipeIT.css";

export default function RecipeIT({ recipes }) {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="container_rightBoard">
      {/* <RightBoard> */}
      {recipes.map(
        (recipe) =>
          recipe.idMeal === id && (
            <div className="box_r">
              <div>
                <span></span>
              </div>
              <div className="name_ricipe">
                <p>{recipe.strMeal}</p>
              </div>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              <div className="ingridients">
                <p>ZUTATEN</p>
                <p>
                  {[
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                    18, 19, 20,
                  ].map((n, i) => {
                    if (!recipe[`strIngredient${n}`] === "") {
                      return (
                        <li key={i}>
                          {recipe[`strIngredient${n}`]}{" "}
                          {recipe[`strMeasure${n}`]},
                        </li>
                      );
                    }
                  })}
                </p>

                {recipe.ingridients && (
                  <ul>
                    {recipe.ingridients.map((item) => (
                      <li>
                        {item.ingridient} {item.ingridient} {item.ingridient}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="box_description">
                <p>ZUBEREITUNG</p>
                <p>{recipe.strInstructions}</p>
              </div>
              <div className="buttons">
                <button>zu meinen Rezepten</button>
                <br />

                <br />
                <button>entfernen von meinen Rezepten</button>
              </div>
            </div>
          )
      )}
      {/* </RightBoard> */}
    </div>
  );
}
