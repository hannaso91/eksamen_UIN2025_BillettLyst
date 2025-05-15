import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { Link } from "react-router-dom";
import "../styles/home.scss"

export default function Home({festivals}) { //henter inn prop som holder på data om festivaler fra app.jsx, gjenbruker innholdet i fetchen for å hente så lite data som mulig for å gjøre nettsiden mer effektiv

    const [selectedCity, setSelectedCity] = useState("Oslo"); // Denne staten brukes for å lagre valgt by, hvilken av knappene brukeren har klikket på, setter default Oslo slik at siden alltid har innhold
    const [cityevents, setCityEvents] = useState([]); // Her lagres fetchen, basert på hvilken by som er valgt. det blir lagret som en array siden vi har skrevet en tom array inni staten. Da må innholdet senere mappes ut
    const cities =  ["Oslo", "Stockholm", "Berlin", "Paris", "London"] //Denne variabelen holder på de ulike byene brukeren kan klikke på. Det gjør det enkelt å legge til flere byer senere. Skriver vi Bergen inni denne variabelen så kommer den knappen med en gang
    // mindre ompa lompa land som Marius kaller det
  
    const fetchEvents = (city) => { // Funksjon som henter events fra API basert på by-navnet som sendes inn som parameter. Brukes både ved oppstart og når bruker klikker på en by-knapp, starten er Oslo.
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&size=10&apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD`)
        .then(response => response.json())
        .then(data => {
            setCityEvents(data._embedded?.events)})
        .catch(error => {
            console.error("Noe gikk galt i fetch av by i home", error);});
    };

    //logget det som kommer fra fetchen for å vite hva vi skulle peke på når dette skulle skrives ut i return med jsx
    console.log("cityevents", cityevents)

    // kjører når siden lastes, med oslo som default for å kunne vise noe på siden
    useEffect(() => {
        fetchEvents("Oslo")
    }, []) // ingen avhengigheter her, det fungerer fint uten ettersom onclick tar seg av endringene, med andre ord så er det handleclick som styrer når fetchevents kjører

    //Denne håndterer klikk på de ulike knappene, og henter nye events når noe er klikket. Sender parameter for å hente inn det korrekte i fetchen. samme sendes i fetchen lenger oppe
    // Klikkes for eks Oslo er det det som blir sendt inn
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
                <article className="festivalCard">
                <img src={event.images?.[0]?.url} alt={event.name} />
                <h3>{event.name}</h3>
                <p><button className="lesmerbtn">Les mer om {event.name}</button></p>
                </article>
            </Link>
            )}
        </section>
        <hr></hr>
        <section className="cityevents">
           {cities.map((city) => (
                <button className="citybtn"key={city} onClick={() => handleClick(city)}>
                    {city}
                </button>
            ))}
            <h3 className="selectedcity">Dette kan du oppleve i: {selectedCity}</h3>
            <ul>
                {cityevents.map((pass) => (
                    <EventCard key={pass.id} pass={pass}/>
                ))}
            </ul>
        </section>
        </>
    )
}