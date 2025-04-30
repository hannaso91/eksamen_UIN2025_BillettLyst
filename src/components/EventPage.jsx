import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function EventPage() {

    const { id } = useParams()
    const [event, setEvent] = useState()

    const getEvent = async () => {
        fetch(`https://app.ticketmaster.com/discovery/v2/attractions/${id}.json?apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD`)
        .then(response => response.json())
        .then((data) => setEvent(data))
        .catch((error) => console.error("Steike da! Det skjedde noe galt, er du sjokkert? NEI! Ikke jeg heller", error))
    }

    useEffect(() => {
        getEvent()
    }, [id])
 

    console.log("id som kommer fra URL", id)

    return (
        <h2>{event?.name}</h2>
    )
        
    
}