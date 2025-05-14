    import { useEffect, useState } from "react";
    import { useParams } from "react-router-dom";
    import EventCard from "./EventCard";
    import HeartIcon from "./HeartIcon";
    import AttractionsCategoryPage from "./AttractionsCategoryPage";
    import SearchForm from "./SearchForm";
    import "../styles/categoryPage.scss";

    export default function CategoryPage({ storageLiked }) {
    const { slug } = useParams();
    const todayISO = new Date().toISOString().split(".")[0] + "Z"; //Etter tips fra Ann-Charlott så brukte vi dette. toISOString og .split. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString Dette gjør så at date blir sendt inn likt som API skriver det
    const [date, setDate] = useState(todayISO); //Her setter vi staten til det som er over.
    const [country, setCountry] = useState("Norge");
    const [categoryCity, setCity] = useState("");
    const [eventsAPI, setEventsAPI] = useState([]);
    const [attractions, setAttractions] = useState([]);
    const [venues, setVenues] = useState([]);
    const [keyword, setKeyword] = useState("");

    const categoryEnglish = {
        musikk: "music",
        sport: "sports",
        teater: "arts & theater"
    };
    const apiCategory = categoryEnglish[slug];
    const countryCode = {
        Norge: "NO",
        Sverige: "SE",
        Danmark: "DK",
        Frankrike: "FR",
        Tyskland: "DE"
    };
    const code = countryCode[country];
    const keywordcheck = keyword ? keyword : `${apiCategory}`;

    const handleSearch = () => { //Etter anbefaling fra Ann-Charlott så burde vi lage en søk knapp basert på dette. Har da laget en søk knapp som da fetcher alt
        // Fetch events
        fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD&keyword=${keywordcheck}&locale=*&countryCode=${code}&startDateTime=${date}&city=${categoryCity}`)
        .then(response => response.json())
        .then(data => setEventsAPI(data._embedded?.events || []))
        .catch(err => console.error("Feil ved events-fetch", err));

        // Fetch attractions
        fetch(`https://app.ticketmaster.com/discovery/v2/attractions?apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD&keyword=${keywordcheck}&locale=*&countryCode=${code}&startDateTime=${date}&city=${categoryCity}`)
        .then(response => response.json())
        .then(data => setAttractions(data._embedded?.attractions || []))
        .catch(err => console.error("Feil ved attractions-fetch", err));

        // Fetch venues
        fetch(`https://app.ticketmaster.com/discovery/v2/venues?apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD&keyword=${keywordcheck}&locale=*&countryCode=${code}&startDateTime=${date}&city=${categoryCity}`)
        .then(response => response.json())
        .then(data => setVenues(data._embedded?.venues || []))
        .catch(err => console.error("Feil ved venues-fetch", err));
    };

    useEffect(() => {
        handleSearch();
    }, [apiCategory]);


    return (
        <>
        <section className="filterSearch">
            <h2 className="categoryheading">{slug}</h2>
            <h3>Filtrert søk</h3>
            <form className="filterSearchForm">
            <label htmlFor="date">
                <input
                type="date"
                id="date"
                value={date ? date.slice(0, 10) : ""}
                onChange={(e) => setDate(`${e.target.value}T00:00:00Z`)}
                />
            </label>
            <label htmlFor="country"></label>
            <select id="country" value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="Norge">Velg land</option>
                <option value="Norge">Norge</option>
                <option value="Sverige">Sverige</option>
                <option value="Danmark">Danmark</option>
                <option value="Frankrike">Frankrike</option>
                <option value="Tyskland">Tyskland</option>
            </select>

            <label htmlFor="city"></label>
            <select id="city" value={categoryCity} onChange={(e) => setCity(e.target.value)}>
                <option value="">Velg by</option>
                <option value="Oslo">Oslo</option>
                <option value="Stockholm">Stockholm</option>
                <option value="København">København</option>
                <option value="Paris">Paris</option>
                <option value="Berlin">Berlin</option>
            </select>
            <button type="button" onClick={handleSearch}>Søk</button>
            </form>
            <SearchForm setKeyword={setKeyword} />
        </section>
        <section>
            <h3 className="atractionheading">Attraksjoner</h3>
            <div className="attractionSection">
            {attractions.map(attraction => (
                <div key={attraction.id}>
                <AttractionsCategoryPage attraction={attraction} storageLiked={storageLiked} />
                <HeartIcon id={attraction.id} />
                </div>
            ))}
            {attractions.length === 0 && attractions !== undefined && (
                <p>Ingen attraksjoner funnet.</p>
            )}

            </div>
        </section>
        <section>
            <h3>Arrangementer</h3>
            <div className="arrangementflex">
            {eventsAPI.map(pass => (
                <div key={pass.id}>
                <EventCard pass={pass} />
                <a href={pass.url} target="_blank">Kjøp billetter</a>
                <HeartIcon id={pass.id} />
                </div>
            ))}
            {eventsAPI.length === 0 && eventsAPI !== undefined && (
                <p>Ingen arrangementer funnet.</p>
            )}

            </div>
        </section>
        <section>
            <h3>Spillesteder/eventsteder</h3>
            {venues.map(attraction => (
            <div key={attraction.id}>
                <AttractionsCategoryPage attraction={attraction} storageLiked={storageLiked} />
                <HeartIcon id={attraction.id} />
            </div>
            ))}
            {venues.length === 0 && venues !== undefined && (
                <p>Ingen spillsteder funnet.</p>
            )}

        </section>
        </>
    );
    }
