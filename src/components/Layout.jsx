import { Link, NavLink } from "react-router-dom";
import Nav from "./Nav";
import {Logo} from "../pictures/BillettLyst.png"

export default function Layout({children}) {
    return(
        <>
        <header>
            <div className="logo">
                <Link to="/"><img src={Logo} alt="Vår logo"/></Link>
            </div>
           <Nav /> 
           <NavLink to="/dashboard">Logg inn</NavLink>
        </header>
        <main>
            {children}
        </main>
        <footer>

        </footer>
        </>
    )
}