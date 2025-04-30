import { Link } from "react-router-dom";

export default function EventCard ({festivals}){
    return(
        <>
        {festivals?.map(event => 
            <Link key={event.id} to={`/event/${event.id}`}>
                <article>
                    <img src={event.images?.[0]?.url}  alt={event.name}/>
                    <h3>{event?.name}</h3>
                    <button>{`les mer om ${event.name}`}</button>
                </article>
            </Link>
        )}
        </>
    )
}