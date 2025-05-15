import { Link, NavLink } from "react-router-dom";
import Logo from "../pictures/BillettLyst.png"
import "../styles/nav.scss"

export default function Nav({signedIn, handleLogout}) {
    return (
        <nav>
            <div className="headerTop"> {/*brukes i css*/}
            <div className="logo"> 
                <Link to="/"><img src={Logo} alt="Vår logo"/></Link>
            </div>
            {/*Tatt fra forelesning, men her håndteres hva som vises i nav basert på om bruker er logget inn eller ikke. Er bruker logget inn vises logg ut og min side*/}
            {/*Hvis bruker ikke er logget inn vises logg inn, derfor sendes prop fra layout og til nav, sjekke om brukeren er logget inn eller ut og vise innhold deretter*/}
            {signedIn ? (
                <>
                    <button onClick={handleLogout}>Logg ut</button>
                    <Link className="minside" to="/dashboard">Min side</Link>
                </>
           ) : (
            <Link to="/dashboard">Logg inn</Link> 
           )}
           </div>
            <ul>
                <li><Link to="/">Hjem</Link></li>
                <li><NavLink to="/category/musikk/">Musikk</NavLink></li> {/*Vi valgte navlink på kategoriene, dette fordi navlink indikerer hvilken side som er aktiv ved å kunne gi det en annen stil*/}
                <li><NavLink to="/category/teater/">Teater</NavLink></li>
                <li><NavLink to="/category/sport/">Sport</NavLink></li>
            </ul>
        </nav>
    );
}


