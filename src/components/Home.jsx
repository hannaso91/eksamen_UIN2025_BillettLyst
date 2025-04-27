import { useState } from "react";
import { useEffect } from "react";


export default function Home() {

    const [eventsByKeywords, setEventsByKeywords] = useState([])

    const filterByKeyword = ["Neon"]

    const getEventsByKeywords = async() => {
        const keywords = filterByKeyword.join(",").toLocaleLowerCase() //fjerner at URL blir case sensitiv, det gjør det enklere å hente ut
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${keywords}&apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD`) //Etter en del prøving og feiling her tenkte vi å prøve og gjøre keywords dynamisk
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data._embedded && data._embedded.events) { //Sjekker om det som hentes ut har data lagret i disse nøklene. Om de ikke har det skal de ikke printes ut da de ikke eksisterer
                setEventsByKeywords(data._embedded.events)
            } else {
                console.log(`Ingen treff på søkeordet: ${keywords}`)
            }
            
      })
      .catch(error => console.error("Feil ved henting av arrangementer:", error));
    }

    useEffect(() => {
        getEventsByKeywords()
    }, [eventsByKeywords]) //definerer her at hvis det skjer endringer i denne variabelen så skal det skje på nytt

    return(
        <>
       <h1>Utvalgte eventer</h1> 
       <ul>
        {eventsByKeywords.map(event => 
            <li key={event.id}>{event?.name}</li>
        )}
       </ul>
        </>
    )
}