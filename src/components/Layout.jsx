import { Link, NavLink } from "react-router-dom";
import Nav from "./Nav";
import "../styles/nav.scss"

export default function Layout({children, signedIn, setSignedIn}) {

    const handleLogout = () => {
        sessionStorage.setItem("login", false)
        setSignedIn(false);
    }

    return(
        <>
        <header>
           <Nav signedIn={signedIn} setSignedIn={setSignedIn} handleLogout={handleLogout}/> 
        </header>
        <main>
            {children}
        </main>
        <footer>

        </footer>
        </>
    )
}