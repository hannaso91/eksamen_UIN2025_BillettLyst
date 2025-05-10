import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ArtistCard from "./ArtistCard"
import EventCard from "./EventCard"
import Some from "./Some"
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
            <h2>{event?.name}</h2>
            <h3>Sjanger:</h3>
            <ul>
                <li>{festivalpass?.[0]?.classifications?.[0]?.genre?.name}</li>
                <li>{festivalpass?.[0]?.classifications?.[0]?.subGenre?.name}</li>
            </ul>
            <h3 className="soMe">Følg oss på sosiale medier!</h3>
            <Some event={event}/>
            <article> {/*Legges inn i Some.jsx når det fungerer med riktig href osv*/}
            </article>
            <hr></hr>
            <h3>Festivalpass:</h3>
            <div className="flexEventCard">
            {festivalpass.map(pass =>
                <div key={pass.id}>
                    <EventCard pass={pass}/>
                    <button className="favorittbtn">Legg til i ønskeliste</button>
                    <a href={pass.url} target="_blank"><button className="kjopbtn">Kjøp</button></a> {/*Bruker A tag ettersom det ikke er internt som Link skal brukes til, dette er en ekstern lenke*/}
                </div>
            )}
            </div>        
        </section>
        <section>
            <ArtistCard festivalpass={festivalpass}/>
        </section>
        </>
      );
    }