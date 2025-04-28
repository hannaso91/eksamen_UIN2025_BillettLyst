import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";


export default function Home({eventsByNeon, filterByNeon, setEventsByNeon, eventsByFindings}) {



    return(
        <>
       <h1>Utvalgte eventer</h1> 
       <section className="neonevents"> 
        <ul>
            {eventsByNeon?.map(event => 
                <Link key={event.id} to={`/event/${event.id}`}><li >{event?.name}</li></Link>
            )}
        </ul>
       </section>
       <section>
        <ul>
            {eventsByFindings?.map(event =>
                <Link key={event.id} to={`/event/${event.id}`}><li >{event?.name}</li></Link>
            )}
        </ul>
       </section>
       {/*<section>
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