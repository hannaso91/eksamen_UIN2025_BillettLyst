import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ArtistCard from "./ArtistCard"
import EventCard from "./EventCard"
import Some from "./Some"
import "../styles/eventPage.scss"

export default function EventPage() {

    const { id } = useParams() //UseParams henter inn det som ligger i url og bruker dette for å filtrere innholdet.
    const [event, setEvent] = useState()
    const [festivalpass, setFestivalPass] = useState([])

    const getEvent = async () => {
        fetch(`https://app.ticketmaster.com/discovery/v2/attractions/${id}.json?apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD`) //Her bruker vi det som kommer fra useParams og routingen der vi definerer id til å filtrere direkte i fetchen
        .then(response => response.json())
        .then((data) =>
            setEvent(data)) //lagrer det som blir hentet i en state
        .catch((error) => console.error("Det skjedde en feil i catch i eventpage på attraksjoner", error))
    }


    const getFestivalPass = async () => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?attractionId=${id}&locale=NO&apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD`)
        .then(response => response.json())
        .then((data) => setFestivalPass(data._embedded.events))
        .catch((error) => console.error("Det skjedde en feil i catch i eventpage på eventer", error))
    }

    console.log("kommer fra festivalpass:", festivalpass) //konsoll logg for å se hvilke nøkler som skal pekes på og hva som må gjøres for å skrive ut det vi skal skrive ut

    // Useeffekten her kjøres hver gang siden rendres eller at id forandrer seg. Om id forandrer seg gjør den en ny fetch og henter ny data på begge fetchene ovenfor
    useEffect(() => {
        getFestivalPass()
        getEvent()
    }, [id])
 

    console.log("id som kommer fra URL", id)

    if (!event) return <p>Laster inn festival...</p>; //La inn en sjekk ettersom vi fant ut at uten denne så kræsjer hele siden, brukte denne så vi slapp at alt kræsjet med at vi heller fikk en feil i konsollen


    /*Brukt kode fra W3Schools på linje 56 for å få en heltrukken linje. Hentet fra: https://www.w3schools.com/tags/tag_hr.asp Dato: 05.05.25*/
    return (
        <>
        <section>
            <h2>{event?.name}</h2>
            <h3>Sjanger:</h3>
            <ul>
                <li>{festivalpass?.[0]?.classifications?.[0]?.genre?.name}</li> {/*Går inn i array med index 0 for å hente informasjon derfra.*/}
                <li>{festivalpass?.[0]?.classifications?.[0]?.subGenre?.name}</li>
            </ul>
            <h3 className="soMe">Følg oss på sosiale medier!</h3>
            <article> 
                <Some event={event}/>
            </article>
            <hr></hr>
            <h3>Festivalpass:</h3>
            <div className="flexEventCard">
            {festivalpass.map(pass =>
                <div key={pass.id}> {/*Div her er kun for css og key slik at vi ikke får feil på key prop, ingen semantisk betydning*/}
                    <EventCard pass={pass}/>
                    <button className="favorittbtn">Legg til i ønskeliste</button>
                    <a href={pass.url} target="_blank" className="kjop">Kjøp</a> {/*Bruker A tag ettersom det ikke er internt som Link skal brukes til, dette er en ekstern lenke*/}
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