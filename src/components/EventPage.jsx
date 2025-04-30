import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function EventPage() {

    const { id } = useParams()
    const [event, setEvent] = useState()

    const getEvent = async () => {
        fetch(`https://app.ticketmaster.com/discovery/v2/attractions/${id}.json?apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD`)
        .then(response => response.json())
        .then((data) => 
            setEvent(data))
        .catch((error) => console.error("Steike da! Det skjedde noe galt, er du sjokkert? NEI! Ikke jeg heller", error))
    }

    useEffect(() => {
        setEvent(null)
        getEvent()
    }, [id])
 

    console.log("id som kommer fra URL", id)

    if (!event) return <p>Laster inn festival...</p>;



    return (
        <article>
          {event.images?.[0]?.url && ( // Legger inn en sjekk, uten denne fikk vi "event is undefined". Ettersom vi henter fra API kan det ta litt tid. Derfor sjekken så ikke hele siden stopper opp
            //Det med å bruke && her var ganske nytt, men fant ut at dette var en fin "snarvei" i React. Leste denne https://react.dev/learn/conditional-rendering
            <img src={event.images[0].url} alt={event.name} />
          )}
          <h2>{event.name}</h2>
        </article>
      );
    }