import { useState } from "react";
import { useEffect } from "react";


export default function Home() {

    const [eventsByNeon, setEventsByNeon] = useState([])
    const [eventsByFindings, setEventsByFindings] = useState([])

    const filterByNeon = "Neon"
    const filterByFindings = "Findings"
    const filterByTonsOfRock = "Tons of Rock"

    const getEventsByNeon = async() => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${filterByNeon}&apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD`) //Etter en del prøving og feiling her tenkte vi å prøve og gjøre keywords dynamisk
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data._embedded && data._embedded.events) { //Sjekker om det som hentes ut har data lagret i disse nøklene. Om de ikke har det skal de ikke printes ut da de ikke eksisterer
                setEventsByNeon(data._embedded.events)
            } else {
                console.log(`Ingen treff på søkeordet: ${filterByNeon}`) //Legger inn denne loggen for å vite om fethen har innhold, har den ikke får vi beskjed
            }    
      })
      .catch(error => console.error("Feil ved henting av arrangementer:", error));
    }

    const getEventsByFindings = async() => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${filterByFindings}&apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD`) //Etter en del prøving og feiling her tenkte vi å prøve og gjøre keywords dynamisk
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data._embedded && data._embedded.events) { 
                setEventsByFindings(data._embedded.events)
            } else {
                console.log(`Ingen treff på søkeordet: ${filterByFindings}`) 
            }    
      })
      .catch(error => console.error("Feil ved henting av arrangementer:", error));
    }

    const getEventsByTonsOfRock = async() => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${filterByTonsOfRock}&apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD`) //Etter en del prøving og feiling her tenkte vi å prøve og gjøre keywords dynamisk
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data._embedded && data._embedded.events) { 
                setEventsByFindings(data._embedded.events)
            } else {
                console.log(`Ingen treff på søkeordet: ${filterByTonsOfRock}`) 
            }    
      })
      .catch(error => console.error("Feil ved henting av arrangementer:", error));
    }

    useEffect(() => {
        getEventsByNeon()
        getEventsByFindings()
        getEventsByTonsOfRock()
    }, []) 

    return(
        <>
       <h1>Utvalgte eventer</h1> 
       <section className="neonevents">
        <h2>{filterByNeon}</h2> 
        <ul>
            {eventsByNeon?.map(event => 
                <li key={event.id}>{event?.name}</li>
            )}
        </ul>
       </section>
       <section>
        <h2>{filterByFindings}</h2>
        <ul>
            {eventsByFindings?.map(event =>
                <li key={event.id}>{event?.name}</li>
            )}
        </ul>
       </section>
       
        </>
    )
}