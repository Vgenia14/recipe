import React, { useState, useContext } from "react";
import "./CreateUser.css";
import { projectAuth, projectFirestore } from "../../firebase/firebase";
import { AuthContext } from "../../context/context";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);
  const context = useContext(AuthContext);
const navigate = useNavigate();

  const signup = async (email, password, displayName) => {
    setError(null);
    try {
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await res.user.updateProfile({ displayName});
      await projectFirestore.collection("users1").doc(res.user.uid).set({
        displayName,
      });
      context.dispatch({ type: "LOGIN", payload: res.user });
      console.log(res);
      if(res.user){navigate("/")}
    } catch (err) {
      setError(err.message); 
    }
  };
  // 
  const handleSubmit = (e) => { 
    e.preventDefault();
    signup(email, password, displayName);
  };

  return (
    <div className="container_createUser">
      <h2>neuen User erstellen </h2>

      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            required
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>
        <label>
          E-Mail:
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>

        <button type="submit">
          User erstellen
        </button>

        {error && <div>{error}</div>}
      </form>
    </div>
  );
}
