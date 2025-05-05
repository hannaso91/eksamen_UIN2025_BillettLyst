import { Link, NavLink } from "react-router-dom";
import Nav from "./Nav";
import Logo from "../pictures/BillettLyst.png"

export default function Layout({children, signedIn, setSignedIn}) {

    const handleLogout = () => {
        sessionStorage.setItem("login", false)
        setSignedIn(false);
    }

    return(
        <>
        <header>
            <div className="logo">
                <Link to="/"><img src={Logo} alt="Vår logo"/></Link>
            </div>
           <Nav /> 
           {signedIn ? (
                <button onClick={handleLogout}>Logg ut</button>
           ) : (
            <Link to="/dashboard">Logg inn</Link>
           )}
           
        </header>
        <main>
            {children}
        </main>
        <footer>

        </footer>
        </>
    )
}