import React, { useState, useContext } from "react";
import "./LoginUser.css";
import { projectAuth} from "../../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/context";

export default function CreateUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const context = useContext(AuthContext);
if(context.user){
  console.log(context.user.uid);
}
  const navigate = useNavigate();

  const login = async (email, password) => {
    setError(null);
    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password);
      context.dispatch({ type: "LOGIN", payload: res.user });
      if (res.user) {
        navigate("/meineRezepte");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    // if (error){ navigate("/createRezept")};
  };

  return (
    <div className="container_loginUser">
      <h2>neuen User erstellen </h2>

      <form onSubmit={handleSubmit}>
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
        <button type="submit">anmelden </button>
      </form>
      {error && <div>{error}</div>}
      <Link to="/CreateUser">noch nicht regestrierd</Link>
    </div>
  );
}
