import { Link, NavLink } from "react-router-dom";
import Nav from "./Nav";

export default function Layout({children}) {
    return(
        <>
        <header>
            <div className="logo">
                <Link to="/"><img src="#" alt="Vår logo"/></Link>
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