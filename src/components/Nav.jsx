import { Link, NavLink } from "react-router-dom";

export default function Nav() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Hjem</Link></li>
                <li><NavLink to="/category/musikk/">Musikk</NavLink></li>
                <li><NavLink to="/category/teater/">Teater</NavLink></li>
                <li><NavLink to="/category/sport/">Sport</NavLink></li>
            </ul>
        </nav>
    );
}


//Gjøre denne dynamisk og hente ut kategorier basert på navnene i API. Muligens lage en egen array vi kan legge inn dersom det ikke eksisterer i arrayren fra før