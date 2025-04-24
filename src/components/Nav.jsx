import { Link } from "react-router-dom";

export default function Nav() {
    return(
        <nav>
            <ul>
                <li><Link to="#"></Link>Hjem</li>
            </ul>
        </nav>
    )
}

//Gjøre denne dynamisk og hente ut kategorier basert på navnene i API. Muligens lage en egen array vi kan legge inn dersom det ikke eksisterer i arrayren fra før