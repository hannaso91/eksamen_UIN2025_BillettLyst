import { Link, NavLink } from "react-router-dom";
import Logo from "../pictures/BillettLyst.png"
import "../styles/nav.scss"

export default function Nav({signedIn, handleLogout}) {
    return (
        <nav>
            <div className="logo">
                <Link to="/"><img src={Logo} alt="Vår logo"/></Link>
            </div>
            <ul>
                <li><Link to="/">Hjem</Link></li>
                <li><NavLink to="/category/musikk/">Musikk</NavLink></li>
                <li><NavLink to="/category/teater/">Teater</NavLink></li>
                <li><NavLink to="/category/sport/">Sport</NavLink></li>
            </ul>
            {signedIn ? (
                <button onClick={handleLogout}>Logg ut</button>
           ) : (
            <Link to="/dashboard">Logg inn</Link>
           )}
        </nav>
    );
}


//Gjøre denne dynamisk og hente ut kategorier basert på navnene i API. Muligens lage en egen array vi kan legge inn dersom det ikke eksisterer i arrayren fra før