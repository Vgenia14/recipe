import { useEffect } from "react";
import { useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import "./App.css";
import { AuthContextProvider } from "./context/context";

// componente
import Nav from "./componente/Nav";
import Sideboard from "./componente/Sideboard";
import NotFound from "./componente/NotFound";
// pages
import CreateRezept from "./pages/createRecept/CreateRezept";
import RezeptListe from "./pages/RezepteListe/RezeptListe";
import CreateUser from "./pages/userCtreate/CreateUser";
import LoginUser from "./pages/userLogin/LoginUser";
import MeineRezepte from "./pages/meineRezepteListe/MeineRezepte";
import Recipe from "./pages/Recipe/Recipe";
import RecipeIT from "./pages/Recipe/RecipeIT";

function App() {
  const [recipes, setRecipes] = useState([]);

  const url = process.env.REACT_APP_URL;
  function createRecepes() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.meals);
      });
  }
  console.log(recipes);
  useEffect(() => {
    createRecepes();
  }, []);

  return (
    <AuthContextProvider>
      {/* <ContextColorProvider> */}
      <BrowserRouter>
        <div className="App">
          <Sideboard />
          <Nav />
          <Routes>
            <Route path="/" element={<RezeptListe recipes={recipes} />} />
            <Route path="/createRezept" element={<CreateRezept />} />
            <Route path="/LoginUser" element={<LoginUser />} />
            <Route path="/CreateUser" element={<CreateUser />} />
            <Route path="/meineRezepte" element={<MeineRezepte />} />
            <Route path="/meineRezepte/:id" element={<Recipe />} />
            <Route path=":id" element={<RecipeIT recipes={recipes} />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* <RightBoard /> */}
        </div>
      </BrowserRouter>
      {/* </ContextColorProvider> */}
    </AuthContextProvider>
  );
}

export default App;
