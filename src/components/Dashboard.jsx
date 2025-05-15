import { useState } from "react";
import "../styles/loginInput.scss"

export default function Dashboard({ user, setSignedIn }) { //tar imot noen props som skal benyttes for å endre innloggingsstatus. Måtte sendes som prop fra app.jsx siden det skal sjekkes flere steder
  // Denne staten lagrer input fra brukeren, altså brukernavnet som blir skrevet inn, det blir lagret i et objekt
  const [userLogin, setUserLogin] = useState({});
  // vi satte også opp en error, dersom den brukeren som blir skrevet inn ikke er i sanity, så skal feilmeldingen komme opp.
  const [error, setError] = useState();

  // Denne funksjonen håndterer endringer i inputfeltet og oppdaterer userLogin-staten basert på name-attributtet til feltet. 
  const handleChange = (e) => {
    const inputName = e.target.name; //Denne henter navnet som blir skrevet i inputfeltet
    setUserLogin((prev) => ({ ...prev, [inputName]: e.target.value })); // Her blir staten userlogin satt med en ny verdi, altså oppdatert. De eksisterende verdiene også beholdes ettersom vi bruker ...prev, vi legger til. Dette gjør det mulig å ha flere felter med tiden, for eks passord
  };

  //Funksjonen kjøres når brukeren klikker på logg inn-knappen. Den forhindrer side-refresh, sjekker om brukeren finnes og setter at brukeren er logget inn
  const handleClick = (e) => {
    e.preventDefault(); // Denne biten hindrer at siden lastes inn på nytt når logg inn klikkes på
    const exists = user.find( //Her sjekker vi om brukernavnet funnes i listen over brukere. Den er ikke sensitiv mot store og små bokstaver, derfor bruker vi toLowerCase. Skulle dette vært på en ekte side burde den være case sensitiv og ikke bruke den funksjonen for sikkerhet.
      (u) => u.name.toLowerCase() === userLogin.username?.toLowerCase() //U er i dette tilfellet en ny variabel fra user, dette for å sjekke alle som ligger i user. Bruker ?, også kalt optional chaining for å unngå feil dersom i dette tilfellet username er undefined
    );

    if (exists) {
      // hvis brukeren finnes, lagrer vi innloggingen i sessionstorage. Valgte sessionstorage fordi det gjelder frem til bruker logger ut eller nettvinduet lukkes. hadde vi brukt localStorage hadde brukeren forblidt pålogget. Noe vi ikke ønsker
      sessionStorage.setItem("login", "true");
      sessionStorage.setItem("loggedInName", exists.name); 
      setSignedIn(true); //Denne oppdaterer staten som kommer fra app.jsx, slik at brukeren blir sett på som logget inn
    } else {
      setError("Brukernavnet finnes ikke i databasen."); //her setter vi erroren. Så hvis brukeren ikke finnes i sanity, så kommer denne feilmeldingen. Vi hadde først ikke denne, noe som kræsjet siden hver gang vi skrev feil
    }
  };

  return (
    <section className="login">{/*på linje 43 kaller vi handleChange funksjonen vi har skrevet over og håndterer det som blir skrevet i inputfeltet for logg inn, vi ser etter endringer*/}
      <h2>Logg inn</h2>
      <form>
        <label htmlFor="username">
          Brukernavn
          <input
            type="text"
            id="username"
            placeholder="Channing Tatum"
            name="username"
            onChange={handleChange} 
          />
        </label>
        <button type="button" onClick={handleClick}>Logg inn</button> {/*Når knappen blir trykket på kalles funksjonen handleClick*/}
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>} {/*Error som dukker opp dersom brukeren ikke finnes blir rød, denne må skrives inne i return for å vises på nettsiden ettersom det er jsx i dette. Kan også fikses med CSS men vi forenklet det siden det gjalt bare her*/}
    </section>
  );
}
