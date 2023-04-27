import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreateRezept.css";
import { AuthContext } from "../../context/context";
import { useFirestore } from "../../hooks/useFirestore";
import { projectStorage } from "../../firebase/firebase";
// import Select from "react-select";

export default function CreateRezept() {
  const [error] = useState(null);
  const context = useContext(AuthContext);
  const { addDocument, response } = useFirestore("rezepten");

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [ingridient, setIngridient] = useState("");
  const [ingridients, setIngridients] = useState([]);

  const [number, setNumber] = useState(0);
  const [unit, setUnit] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [isMy] = useState(false);
  const [isMenu, setFormError] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);

  // const categories = [
  //   {
  //     value: "SUPPEN  ",
  //     label: "SUPPEN",
  //     subCategorie: [
  //       { value: "Suppenpüree", label: "Design" },
  //       { value: "Gemüsesuppe", label: "Gemüsesuppe" },
  //     ],
  //   },
  //   {
  //     value: "SALATEN",
  //     label: "Marketing",
  //     subCategorie: [
  //       { value: "Gemüsesalat", label: "Gemüsesalat" },
  //       { value: "Meeresefrüchtesalat", label: "Meeresefrüchtesalat" },
  //     ],
  //   },
  // ];
  // console.log(document);

  // UPDATE
  // const handleChange = async (e, id) => {
  //   e.preventDefault();
  //   setFormError(null);

  //   projectFirestore
  //     .collection("rezepten")
  //     .doc(id)
  //     .onSnapshot(
  //       (snapshot) => {
  //         console.log(snapshot);
  //         if (snapshot.data()) {
  //           setDocument({ ...snapshot.data(), id: snapshot.id });
  //           setError(null);
  //         } else {
  //           setError("Project doesn't exist");
  //         }
  //       },
  //       (err) => {
  //         setError(err.message);
  //       }
  //     );

  //   await updateDocument(document.id, {
  //     ingridients: [{ ...document.ingridients, ingridient, number, unit }],
  //   });
  //   if (!response.error) {
  //     navigate("/meineRezepte");
  //     console.log(error);
  //   }
  // };
  // ADD
  const handleAddIngrid = (e) => {
    e.preventDefault();
    setIngridients([
      ...ingridients,
      {
        ingridient,
        number,
        unit,
      },
    ]);

    console.log(ingridients);
  };

  // ADD
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    const uploadPath = `thumbnails1/${context.user.uid}/${thumbnail.name}`;
    const img = await projectStorage.ref(uploadPath).put(thumbnail);
    const imgUrl = await img.ref.getDownloadURL();

    const rezepten = {
      name,
      photoURL: imgUrl,
      ingridients,
      number,
      unit,
      description,
      category,
      isMy,
      isMenu,
      user: context.user.uid,
    };

    await addDocument(rezepten);

    if (!response.error) {
      navigate("/meineRezepte");
      console.log(error);
    }
  };
  console.log(context.user.uid);
  return (
    <div className="container_newRecipe">
      <h2>Rezept erstellen oder ändern</h2>
      <form className="box_form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          Foto
          <input
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
          />
        </label>
        <label>
          Zutaten
          <input
            type="text"
            placeholder="1"
            onChange={(e) => setIngridient(e.target.value)}
            value={ingridient}
          />
        </label>
        <label>
          Anzahl
          <input
            type="number"
            onChange={(e) => setNumber(e.target.value)}
            value={number}
          />
        </label>
        <label>
          Einheit
          <input
            type="text"
            onChange={(e) => setUnit(e.target.value)}
            value={unit}
          />
        </label>
        <span style={{ cursor: "pointer" }} onClick={handleAddIngrid}>
          +
        </span>
        <label>
          Beschreibung
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </label>
        <label>
          Kategorie
          {/* <Select
            options={categories}
            onChange={(option) => setCategory(option)}
          /> */}
          <input
            type="text"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          />
        </label>
        <button type="button">Kategorie erstellen</button>
        <Link to="/zusätzlich">zusätzlich</Link>
        <button type="submit">erstellen</button>
      </form>
      {/* <button className="button_update">ändern</button> */}
      <div></div>
    </div>
  );
}
