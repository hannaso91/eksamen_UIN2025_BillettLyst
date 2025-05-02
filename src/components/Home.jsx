
import { Link, useParams } from "react-router-dom";
import CityEvents from "./CityEvents";
import EventCard from "./EventCard";

export default function Home({festivals}) {

    return(
        <>
        <h1>Utvalgte festivaler</h1> 
        <section className="festivals"> 
            <EventCard festivals={festivals}/>
        </section>
        <section>
            <Link to={`event/oslo`}>Oslo</Link>
            <Link to={`event/stockholm`}>Stockholm</Link>
            <Link to={`event/berlin`}>Berlin</Link>
            <Link to={`event/paris`}>Paris</Link>
            <Link to={`event/london`}>London</Link>
            <CityEvents />
        </section>
        </>
    )
}