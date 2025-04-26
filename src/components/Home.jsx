import { useState } from "react";
import { useEffect } from "react";


export default function Home() {

    const [EventsByKeywords, setEventsByKeywords] = useState([])

    const filterByKeyword = ["Findings", "Neon", "Skeikampfestivalen", "Tons of Rock"]

    const getEventsByKeywords = async() => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?size=100&apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
      })
      .catch(error => console.error("Feil ved henting av arrangementer:", error));
    }

    useEffect(() => {
        getEventsByKeywords()
    }, [])

    return(
        <>
       <h1>Utvalgte eventer</h1> 
       <ul>
        {EventsByKeywords.map(event => 
            <li key={event.id}>{event?.name}</li>
        )}
       </ul>
        </>
    )
}