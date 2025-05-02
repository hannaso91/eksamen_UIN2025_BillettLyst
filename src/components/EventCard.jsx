import { Link } from "react-router-dom";

export default function EventCard ({festivals}){
    return(
        <>
        {festivals?.map(event => 
            <Link key={event.id} to={`/event/${event.id}`} className="event-card">
            <article>
              <img src={event.images?.[0]?.url} alt={event.name} />
              <h3>{event.name}</h3>
              <p>Les mer om {event.name}</p>
            </article>
          </Link>
          
        )}
        </>
    )
}