import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import FestivalPass from "./FestivalPass"
import ArtistCard from "./ArtistCard"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'


export default function EventPage() {

    const { id } = useParams()
    const [event, setEvent] = useState()
    const [festivalpass, setFestivalPass] = useState([])

    const getEvent = async () => {
        fetch(`https://app.ticketmaster.com/discovery/v2/attractions/${id}.json?apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD`)
        .then(response => response.json())
        .then((data) => 
            setEvent(data))
        .catch((error) => console.error("Steike da! Det skjedde noe galt, er du sjokkert? NEI! Ikke jeg heller", error))
    }


    const getFestivalPass = async () => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?attractionId=${id}&locale=NO&apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD`)
        .then(response => response.json())
        .then((data) => setFestivalPass(data._embedded.events))
        .catch((error) => console.error("Steike da! Det skjedde noe galt, er du sjokkert? NEI! Ikke jeg heller", error))
    }

    console.log("kommer fra:", festivalpass)

    useEffect(() => {
        getFestivalPass()
        //setEvent(null)
        getEvent()
    }, [id])
 

    console.log("id som kommer fra URL", id)

    if (!event) return <p>Laster inn festival...</p>;



    return (
        <>
        <section>
            <h2>{event.name}</h2>
            <h3>Sjanger:</h3>
            <ul>
                <li>{event.classifications?.[0]?.genre?.name}</li>
            </ul>
            <h3>Følg oss på sosiale medier:</h3>
            <article> {/*Legges inn i Some.jsx når det fungerer med riktig href osv*/}
                <a href="https://www.facebook.com" target="_blank"> {/*Bruker A istedet for link siden det ikke er interne linker men eksterne*/}
                    <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="https://www.instagram.com" target="_blank" >
                    <FontAwesomeIcon icon={faInstagram} />
                </a>
            </article>

            <h3>Festivalpass:</h3>
                <FestivalPass festivalpass={festivalpass}/>
        </section>
        <section>
            <ArtistCard festivalpass={festivalpass}/>
        </section>
        </>
      );
    }