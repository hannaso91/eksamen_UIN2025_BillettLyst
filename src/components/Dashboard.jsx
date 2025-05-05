import { useState } from "react";
import LoginInput from "./LoginInput";

export default function Dashboard({storageUser, setSignedIn}) {

    const [userLogin, setUserLogin] = useState([])
    const [error, setError] = useState()

    const handleChange = (e) => {
        const inputName = e.target.name
        setUserLogin((prev) => ({...prev, [inputName] : e.target.value}))
    }

    const handleClick = (e) => {
        e.preventDefault();
        const existingUser = JSON.parse(storageUser)
        const exists = userLogin.username === existingUser.username
        exists ? setSignedIn(true) && sessionStorage.setItem("login", true) : setError("Brukernavn eller passord stemmer ikke")

        
    }

    

    return(
        <>
        <h2>Logg inn</h2>
        <form>
            <label>
                Brukernavn
                <input type="text" placeholder="Signesoj...." name="username" onChange={handleChange}/>
            </label>
            <button onClick={handleClick}>Logg inn</button>
        </form>
        </>
    )
}