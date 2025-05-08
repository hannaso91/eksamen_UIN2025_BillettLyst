import { useState } from "react";

export default function Dashboard({ user, setSignedIn }) {
  const [userLogin, setUserLogin] = useState({});
  const [error, setError] = useState();

  const handleChange = (e) => {
    const inputName = e.target.name;
    setUserLogin((prev) => ({ ...prev, [inputName]: e.target.value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const exists = user.find(
      (u) => u.name.toLowerCase() === userLogin.username?.toLowerCase()
    );

    if (exists) {
      localStorage.setItem("login", "true");
      localStorage.setItem("loggedInName", exists.name); 
      setSignedIn(true);
    } else {
      setError("Brukernavnet finnes ikke i databasen.");
    }
  };

  return (
    <>
      <h2>Logg inn</h2>
      <form>
        <label>
          Brukernavn
          <input
            type="text"
            placeholder="Channing Tatum"
            name="username"
            onChange={handleChange}
          />
        </label>
        <button onClick={handleClick}>Logg inn</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}
