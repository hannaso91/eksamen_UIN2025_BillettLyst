import { Link } from "react-router-dom";

export default function Home({festivals}) {
    return(
        <>
       <h1>Utvalgte festivaler</h1> 
       <section className="festivals"> 
        <ul>
            {festivals?.map(event => 
                <Link key={event.id} to={`/event/${event.id}`}>
                    <img src={event.images?.[0]?.url}  alt={event.name}/>
                    <li >{event?.name}</li>
                </Link>
            )}
        </ul>
       </section>
        </>
    )
}