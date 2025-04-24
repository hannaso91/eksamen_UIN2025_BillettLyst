import { Link } from "react-router-dom";
import Nav from "./Nav";

export default function Layout({children}) {
    return(
        <>
        <header>
            <div className="logo">
                <Link to="/"><img src="#" alt="Vår logo"/></Link>
            </div>
           <Nav /> 
        </header>
        <main>
            {children}
        </main>
        <footer>

        </footer>
        </>
    )
}