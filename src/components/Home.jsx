import { Link } from "react-router-dom";
import EventCard from "./EventCard"

export default function Home({festivals}) {
    return(
        <>
        <h1>Utvalgte festivaler</h1> 
        <section className="festivals"> 
        
            <EventCard festivals={festivals}/>
        
        </section>
        <section>
            
        </section>
        </>
    )
}