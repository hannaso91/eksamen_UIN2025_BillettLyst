import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ArtistCard from "./ArtistCard"
import EventCard from "./EventCard"
import "../styles/eventPage.scss"



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

    console.log("kommer fra festivalpass:", festivalpass)

    useEffect(() => {
        getFestivalPass()
        getEvent()
    }, [id])
 

    console.log("id som kommer fra URL", id)

    if (!event) return <p>Laster inn festival...</p>;


    /*Brukt kode fra W3Schools på linje 57 for å få en heltrukken linje. Hentet fra: https://www.w3schools.com/tags/tag_hr.asp Dato: 05.05.25*/
    return (
        <>
        <section>
            <h2>{event.name}</h2>
            <h3>Sjanger:</h3>
            <ul>
                <li>{event.classifications?.[0]?.genre?.name}</li>
            </ul>
            <h3 className="soMe">Følg oss på sosiale medier!</h3>
            <article> {/*Legges inn i Some.jsx når det fungerer med riktig href osv*/}
            </article>
            <hr></hr>
            <h3>Festivalpass:</h3>
            <div className="flexEventCard">
            {festivalpass.map(pass =>
                <EventCard key={pass.id} pass={pass}/>
            )}
            </div>        
        </section>

        <section>
            <ArtistCard festivalpass={festivalpass}/>
        </section>
        </>
      );
    }