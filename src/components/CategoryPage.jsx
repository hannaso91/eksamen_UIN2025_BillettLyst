import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ArtistCard from "./ArtistCard"
import EventCard from "./EventCard"
import HeartIcon from "./HeartIcon"
import VenuesCategoryPage from "./VenuesCategoryPage"
import AttractionsCategoryPage from "./AttractionsCategoryPage"

export default function CategoryPage ({storageLiked}) {

    const {slug} = useParams()
    const [date, setDate] = useState(() => new Date().toISOString()) //fant om dette her https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
    //Datoen vil da default alltid være fra dagens dato og fremover i tid, dette sikrer at bruker ikke får ut arrangementer som har gått ut på dato
    const [country, setCountry] = useState("Norge") // Setter inn default slik at noe alltid er der når siden lastes
    const [categoryCity, setCity] = useState("Oslo")
    const [eventsAPI, setEventsAPI] = useState([])
    const [attractionAPI, setAttractionAPI] = useState([])
    const [venuesAPI, setVenuesAPI] = useState([])

    console.log("slug", slug)
   

    //Vi skjønte tidlig at APIet ikke vil forstå norsk siden URL er på norsk ville ikke det gitt resultater i fetchen. Vi valgte derfor å lage en egen variabel som gjør det om til engelsk og bruke slug for å hente ut riktig
    // Dette må matche det som er i APIet for å få hentet ut noe
    const categoryEnglish = {
        musikk: "music",
        sport: "sports",
        teater: "arts & theater"
    }

    //Lager så en variabel som henter inn basert på riktig slug
    const apiCategory = categoryEnglish[slug] || "music"
    console.log("apiCategory", apiCategory)
    //Det samme må gjøres med land, inputen er på norsk og den må gjøres om til countrycode siden det er det som blir brukt i APIet1

    const countryCode = {
        Norge: "NO",
        Sverige: "SE",
        Danmark: "DK"
    }

    const code = countryCode[country]

    const getEventsInEventsAPI = async() => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=${apiCategory}&startDateTime=${date}&city=${categoryCity}&countryCode=${code}&apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD`)
        .then(response => response.json())
        .then(data => {
            console.log("Full respons fra API:", data);
            setEventsAPI(data._embedded?.events)})
        .catch(error => {
            console.error("Steike da! Det skjedde noe galt, er du sjokkert? NEI! Ikke jeg heller", error);});
    }

    
    const getEventsInAttractionAPI = async() => {
        fetch(`https://app.ticketmaster.com/discovery/v2/attractions.json?classificationName=${apiCategory}&startDateTime=${date}&city=${categoryCity}&countryCode=${code}&apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD`)
        .then(response => response.json())
        .then(data => {
            console.log("Full respons fra API:", data);
            setAttractionAPI(data._embedded?.attractions)})
        .catch(error => {
            console.error("Steike da! Det skjedde noe galt, er du sjokkert? NEI! Ikke jeg heller", error);});
    }

    const getEventsInVenuesAPI = async() => {
        fetch(`https://app.ticketmaster.com/discovery/v2/venues.json?classificationName=${apiCategory}&startDateTime=${date}&city=${categoryCity}&countryCode=${code}&apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD`)
        .then(response => response.json())
        .then(data => {
            console.log("Full respons fra API:", data);
            setVenuesAPI(data._embedded?.venues)})
        .catch(error => {
            console.error("Steike da! Det skjedde noe galt, er du sjokkert? NEI! Ikke jeg heller", error);});
    }

    useEffect(() => {
        getEventsInEventsAPI() //Her kjører vi fetchen slik at eventer kommer inn etter filtrering
        getEventsInAttractionAPI()
        getEventsInVenuesAPI()
    }, [slug, date, country, categoryCity])

    console.log("categorypage eventer", eventsAPI)
    console.log("categorypage attractions", attractionAPI)
    console.log("categorypage venues", venuesAPI)

    return(
        <>
        <section className="filterSearch"> {/*Siden det er en stund siden webutvikling måtte vi søke litt for å finne ut av dette, fant raskt denne siden https://stackoverflow.com/questions/17227982/html-add-input-field-inside-a-dropdown-box*/}
            <h2>{slug}</h2>
            <h3>Filtrert søk</h3>
            <form>
                <label htmlFor="date">
                    <input type="date" id="date" value={date} onChange={(e) => setDate(`${e.target.value}T00:00:00Z`)}></input> {/*Laget en onChange som håndterer endringer i de ulike inputene og lagrer de endringene i en state som vi kan bruke for å hente ut det vi ønsker*/}
                </label>
                <label htmlFor="country">
                    <select id="country" name="country" value={country} onChange={(e) => setCountry(e.target.value)}>
                        <option value="Norge">Norge</option>
                        <option value="Sverige">Sverige</option>
                        <option value="Danmark">Danmark</option>
                    </select>
                </label>
                <label htmlFor="city">
                    <select id="city" name="city" value={categoryCity} onChange={(e) => setCity(e.target.value)}>
                        <option value="Oslo">Oslo</option>
                        <option value="Stockholm">Stockholm</option>
                        <option value="København">København</option> 
                    </select>
                </label>
            </form>
        </section>
        <section>
            <h3>Attraksjoner</h3>
            {attractionAPI.map(attraction =>
                <AttractionsCategoryPage attraction={attraction} storageLiked={storageLiked} key={attraction.id}/>

            )}
        </section>
        <section className="">
            <h3>Arrangementer</h3>
            {eventsAPI.map(pass =>
            <>
                <EventCard pass={pass} key={pass.id}/>
                <span>
                    <HeartIcon storageLiked={storageLiked} id={pass.id}/>
                </span>
            </>   
            )}
        </section>
        <section>
            <h3>Spillesteder/eventsteder</h3>
            {venuesAPI.map(venue => 
                <VenuesCategoryPage key={venue.id} venue={venue} storageLiked={storageLiked} />
            )}
            
        </section>
        </>
    )
}