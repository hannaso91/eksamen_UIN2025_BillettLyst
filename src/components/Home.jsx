import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { Link } from "react-router-dom";
import "../styles/home.scss"

export default function Home({festivals}) {

    const [selectedCity, setSelectedCity] = useState("Oslo");
    const [cityevents, setCityEvents] = useState([]);
    const cities =  ["Oslo", "Stockholm", "Berlin", "Paris", "London"] 
  
    const fetchEvents = (city) => {
        setSelectedCity(city);

        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&size=10&apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD`)
        .then(response => response.json())
        .then(data => {
            setCityEvents(data._embedded?.events)})
        .catch(error => {
            console.error("Steike da! Det skjedde noe galt, er du sjokkert? NEI! Ikke jeg heller", error);});
    };

    console.log("cityevents", cityevents)

    useEffect(() => {
        fetchEvents("Oslo")
    }, [])

    const handleClick = (city) => {
        setSelectedCity(city);
        fetchEvents(city);
    };

    return(
        <>
        <h1>Utvalgte festivaler</h1> 
        <section className="festivals"> 
            {festivals?.map(event => 
                <Link key={event.id} to={`/event/${event.id}`} className="event-card">
                <article>
                <img src={event.images?.[0]?.url} alt={event.name} />
                <h3>{event.name}</h3>
                <p>Les mer om {event.name}</p>
                </article>
            </Link>
            )}
        </section>
        <section className="cityevents">
           {cities.map((city) => (
                <button className="citybtn"key={city} onClick={() => handleClick(city)}>
                    {city}
                </button>
            ))}
            <h3>Dette kan du oppleve i: {selectedCity}</h3>
            <ul>
                {cityevents.map((pass) => (
                    <EventCard key={pass.id} pass={pass}/>
                ))}
            </ul>
            
        </section>
        </>
    )
}