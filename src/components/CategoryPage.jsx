import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ArtistCard from "./ArtistCard"
import EventCard from "./EventCard"
import HeartIcon from "./HeartIcon"
import VenuesCategoryPage from "./VenuesCategoryPage"
import AttractionsCategoryPage from "./AttractionsCategoryPage"
import SearchForm from "./SearchForm"
import "../styles/categoryPage.scss"

export default function CategoryPage ({storageLiked}) {

    const {slug} = useParams()
    const [date, setDate] = useState(() => {
        const today = new Date();
        return today.toISOString()
    })
    const [country, setCountry] = useState("Norge") // Setter inn default slik at noe alltid er der når siden lastes
    const [categoryCity, setCity] = useState("Oslo")
    const [eventsAPI, setEventsAPI] = useState(() => [])
    const [attractions, setAttractions] = useState([])
    const [venues, setVenues] = useState([])
    const [keyword, setKeyword] = useState("")
   

    console.log("slug", slug)
    console.log(date)
   

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
        Danmark: "DK",
        Frankrike: "FR",
        Tyskland: "DE"
    }

    const code = countryCode[country]

    const getEventsInEventsAPI = async () => {
        
        fetch(`https://app.ticketmaster.com/discovery/v2/suggest?apikey=8jut1LP6C3Z6ZSSJU3PCMoler5qA4oZW&keyword=${categoryCity} ${apiCategory}&locale=*&countryCode=${code}`)
            .then(response => response.json())
            .then(data => {
                console.log("Full respons fra API:", data);
                setEventsAPI(data._embedded?.events || []);
                setAttractions(data._embedded?.attractions || []);
                setVenues(data._embedded?.venues || []);
            })
            .catch(error => {
                console.error("Steike da! Det skjedde noe galt, er du sjokkert? NEI! Ikke jeg heller", error);
            });
    }

    useEffect(() => {
        getEventsInEventsAPI()
    }, [slug, categoryCity, code, keyword, date])


    return(
        <>
        <section className="filterSearch"> {/*Siden det er en stund siden webutvikling måtte vi søke litt for å finne ut av dette, fant raskt denne siden https://stackoverflow.com/questions/17227982/html-add-input-field-inside-a-dropdown-box*/}
            <h2 className="categoryheading">{slug}</h2>
            <h3>Filtrert søk</h3>
            <form className="filterSearchForm">
                <label htmlFor="date">
                    <input type="date" id="date" value={date ? date.slice(0, 10) : ""} onChange={(e) => setDate(`${e.target.value}T00:00:00Z`)}></input> {/*Laget en onChange som håndterer endringer i de ulike inputene og lagrer de endringene i en state som vi kan bruke for å hente ut det vi ønsker*/}
                </label>
                <label htmlFor="country"></label>
                <select id="country" name="country" value={country} onChange={(e) => setCountry(e.target.value)}>
                    <option value="Norge">Velg land</option> {/*Det blir satt til value Norge som default slik at det blir samme som usestate, da er det innhold når siden lastes*/}
                    <option value="Norge">Norge</option>
                    <option value="Sverige">Sverige</option>
                    <option value="Danmark">Danmark</option>
                    <option value="Frankrike">Frankrike</option>
                    <option value="Tyskland">Tyskland</option>
                </select>
                <label htmlFor="city"></label>
                <select id="city" name="city" value={categoryCity} onChange={(e) => setCity(e.target.value)}>
                    <option value="Oslo">Velg by</option> {/*Det blir satt til value Oslo som default slik at det blir samme som usestate, da er det innhold når siden lastes*/}
                    <option value="Oslo">Oslo</option>
                    <option value="Stockholm">Stockholm</option>
                    <option value="København">København</option>
                    <option value="Paris">Paris</option> 
                    <option value="Berlin">Berlin</option>
                </select>
            </form>
            <SearchForm setKeyword={setKeyword}/>
        </section>
        <section>
        <h3 className="atractionheading">Attraksjoner</h3>
        </section>
        <section className="attractionSection">
            {attractions.map(attraction =>
            <div key={attraction.id}>
                <AttractionsCategoryPage attraction={attraction} storageLiked={storageLiked}/>
                    <span>
                        <HeartIcon id={attraction.id} />
                    </span>
            </div>
            )}
        </section>
        <section>
            <h3>Arrangementer</h3>
            {eventsAPI.map(pass =>
                <div key={pass.id}>
                    <EventCard pass={pass} />
                    <span>
                        <HeartIcon id={pass.id} />
                    </span>
                </div>
            )}

        </section>
        <section>
            <h3>Spillesteder/eventsteder</h3>
            {venues.map(venue => 
            <div key={venue.id}>
                <VenuesCategoryPage venue={venue} storageLiked={storageLiked} />
                <span>
                    <HeartIcon id={venue.id} />
                </span>
            </div>
            )}
            
        </section>
        </>
    )
}