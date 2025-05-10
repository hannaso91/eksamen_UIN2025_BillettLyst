import { useState } from "react";

export default function Dashboard({ user, setSignedIn }) { //tar imot noen props som skal benyttes for å endre innloggingsstatus. Måtte sendes som prop fra app.jsx siden det skal sjekkes flere steder
  // Denne staten lagrer input fra brukeren, altså brukernavnet som blir skrevet inn
  const [userLogin, setUserLogin] = useState({});
  // vi satte også opp en error, dersom den brukeren som blir skrevet inn ikke er i sanity, så skal feilmeldingen komme opp.
  const [error, setError] = useState();

  // Denne funksjonen oppdaterer inputen fra brukeren av nettsiden, den blir kalt inne i return for å gjøre endringer
  const handleChange = (e) => {
    const inputName = e.target.name; //Denne henter navnet som blir skrevet i inputfeltet
    setUserLogin((prev) => ({ ...prev, [inputName]: e.target.value })); // Her blir staten userlogin satt med en ny verdi, altså oppdatert. De eksisterende verdiene også beholdes ettersom vi bruker ...prev, vi legger til
  };

  //Funksjonen kjører når brukere klikker på logg inn
  const handleClick = (e) => {
    e.preventDefault(); // Denne biten hindrer at siden lastes inn på nytt når logg inn klikkes på
    const exists = user.find( //Her sjekker vi om brukernavnet funnes i listen over brukere. Den er ikke sensitiv mot store og små bokstaver, derfor bruker vi toLowerCase. Skulle dette vært på en ekte side burde den være case sensitiv og ikke bruke den funksjonen
      (u) => u.name.toLowerCase() === userLogin.username?.toLowerCase() //U er i dette tilfellet en ny variabel fra user, dette for å sjekke alle som ligger i user
    );

    if (exists) {
      // hvis brukeren finnes, lagrer vi innloggingen i localstorage.
      localStorage.setItem("login", "true");
      localStorage.setItem("loggedInName", exists.name); 
      setSignedIn(true); //Denne oppdaterer staten som kommer fra app.jsx, slik at brukeren blir sett på som logget inn
    } else {
      setError("Brukernavnet finnes ikke i databasen."); //her setter vi erroren. Så hvis brukeren ikke finnes i sanity, så kommer denne feilmeldingen. Vi hadde først ikke denne, noe som kræsjet siden hver gang vi skrev feil
    }
  };

  return (
    <section>
      <h2>Logg inn</h2>
      <form>
        <label htmlFor="username">
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
    </section>
  );
}
