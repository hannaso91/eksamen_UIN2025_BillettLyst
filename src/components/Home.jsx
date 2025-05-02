
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
           
            <CityEvents />
        </section>
        </>
    )
}