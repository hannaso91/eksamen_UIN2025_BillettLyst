import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ArtistCard from "./ArtistCard"
import EventCard from "./EventCard"

export default function CategoryPage () {

    const {slug} = useParams()
    const [date, setDate] = useState("")
    const [country, setCountry] = useState("Norge") // Setter inn default slik at noe alltid er der når siden lastes
    const [categoryCity, setCity] = useState("Oslo")
    const [eventsCategory, setEventsCategory] = useState([])

    //Vi skjønte tidlig at APIet ikke vil forstå norsk siden URL er på norsk ville ikke det gitt resultater i fetchen. Vi valgte derfor å lage en egen variabel som gjør det om til engelsk og bruke slug for å hente ut riktig
    // Dette må matche det som er i APIet for å få hentet ut noe
    const categoryEnglish = {
        musikk: "music",
        sport: "sports",
        teater: "arts & theater"
    }

    //Lager så en variabel som henter inn basert på riktig slug
    const apiCategory = categoryEnglish[slug]

    //Det samme må gjøres med land, inputen er på norsk og den må gjøres om til countrycode siden det er det som blir brukt i APIet1

    const countryCode = {
        Norge: "NO",
        Sverige: "SE",
        Danmark: "DK"
    }

    const code = countryCode[country]

    const getEventsInCategoryPage = async() => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=${apiCategory}&city=${categoryCity}&countryCode=${code}&apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD`)
        .then(response => response.json())
        .then(data => {
            console.log("Full respons fra API:", data);
            setEventsCategory(data._embedded?.events)})
        .catch(error => {
            console.error("Steike da! Det skjedde noe galt, er du sjokkert? NEI! Ikke jeg heller", error);});
    }

    useEffect(() => {
        getEventsInCategoryPage()
    }, [slug, date, country, categoryCity])

    console.log("categorypage eventer", eventsCategory)

    return(
        <>
        <section className="filterSearch"> {/*Siden det er en stund siden webutvikling måtte vi søke litt for å finne ut av dette, fant raskt denne siden https://stackoverflow.com/questions/17227982/html-add-input-field-inside-a-dropdown-box*/}
            <h2>{slug}</h2>
            <h3>Filtrert søk</h3>
            <form>
                <label htmlFor="date">
                    <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)}></input> {/*Laget en onChange som håndterer endringer i de ulike inputene og lagrer de endringene i en state som vi kan bruke for å hente ut det vi ønsker*/}
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
                        <option value="oslo">Oslo</option>
                        <option value="stockholm">Stockholm</option>
                        <option value="København">København</option> 
                    </select>
                </label>
            </form>
        </section>
        <section>
            <h3>Attraksjoner</h3>
                
        </section>
        <section>
            <h3>Arrangementer</h3>
                
        </section>
        <section>
            <h3>Spillesteder/eventsteder</h3>
        </section>
        </>
    )
}