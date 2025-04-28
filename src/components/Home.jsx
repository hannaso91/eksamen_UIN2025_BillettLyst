import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";


export default function Home({eventsByNeon, filterByNeon, setEventsByNeon}) {

    const {id} = useParams()

    const handleclick = async() => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD`)
        .then(response => response.json())
        .then((data) => console.log(data))
        .catch(error => console.error("Det skjedde en feil med id fetch", error))
    }

    useEffect(() => {
        handleclick()
    }, [])

    return(
        <>
       <h1>Utvalgte eventer</h1> 
       <section className="neonevents">
        <h2>{filterByNeon}</h2> 
        <ul>
            {eventsByNeon?.map(event => 
                <Link key={event.id} to="/event/:id"><li >{event?.name}</li></Link>
            )}
        </ul>
       </section>
       {/*<section>
        <h2>{filterByFindings}</h2>
        <ul>
            {eventsByFindings?.map(event =>
                <Link key={event.id} to="/event/:id"><li >{event?.name}</li></Link>
            )}
        </ul>
       </section>
       <section>
        <h2>{filterByTonsOfRock}</h2>
        <ul>
            {eventsByTonsOfRock?.map(event =>
                <Link key={event.id} to="/event/:id"><li >{event?.name}</li></Link>
            )}
        </ul>
       </section>*/}
       
        </>
    )
}