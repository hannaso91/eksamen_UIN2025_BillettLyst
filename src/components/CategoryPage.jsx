    import { useEffect, useState } from "react";
    import { useParams } from "react-router-dom";
    import EventCard from "./EventCard";
    import HeartIcon from "./HeartIcon";
    import AttractionsCategoryPage from "./AttractionsCategoryPage";
    import SearchForm from "./SearchForm";
    import "../styles/categoryPage.scss";

    export default function CategoryPage({ storageLiked }) { //tar imot parameter for å kunne sette ønsker og lagre de i localstorage
    const { slug } = useParams();
    const todayISO = new Date().toISOString().split(".")[0] + "Z"; //Etter tips fra Ann-Charlott så brukte vi dette. toISOString og .split. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString Dette gjør så at date blir sendt inn likt som API skriver det
    const [date, setDate] = useState(todayISO); //Her setter vi staten til det som er over(hvordan datoen skrives).
    const [country, setCountry] = useState("Norge"); //setter som default norge sik at det er innhold når categorypage blir trykket inn på
    const [categoryCity, setCity] = useState(""); //Denne hadde vi først Oslo i, men vi fant ut at dette ødela for filtrering av land, derfor er den tom
    const [eventsAPI, setEventsAPI] = useState([]);
    const [attractions, setAttractions] = useState([]);
    const [venues, setVenues] = useState([]);
    const [keyword, setKeyword] = useState(""); //Her lagres det brukeren skriver inn i søkefeltet

    const categoryEnglish = { //Vår slug er på norsk, dette skjønte vi raskt at ikke fungerte med APIet, det måtte gjøres til engelsk. Vi var da på explorer for å finne ut hvordan dette var i apiet, for deretter og gjøre det om til engelsk
        musikk: "music",
        sport: "sports",
        teater: "arts & theater"
    };
    const apiCategory = categoryEnglish[slug]; //Her gjøres slug om til engelsk, er musikk valgt så ligger music lagret her som vi kan bruke i fetchen som apiet vil forstå

    const countryCode = { //Det samme som kategori gjelder her, APIet vil ikke forstå Norge men det forstår NO. Her brukte vi også explorer for å finne ut hvilken kode de ulike landene hadde.
        Norge: "NO",
        Sverige: "SE",
        Danmark: "DK",
        Frankrike: "FR",
        Tyskland: "DE"
    };
    const code = countryCode[country]; //Her settes det som ligger i country (altså det landet bruker har valgt) til en kode som APIet forstår som vi kan bruke i fetchene

    const keywordcheck = keyword ? keyword : `${apiCategory}`; //Ettersom vi ønsket at søkeord skulle fungere uavhengig av alt annet, valgte vi å lage en variabel som holdet på logikken vi ønsket i fetchen. Hvis keyword finnes så gjelder keyword, hvis ikke gjelder valgt kategori

    const handleSearch = () => { //Etter anbefaling fra Ann-Charlott så burde vi lage en søk knapp basert på dette. Har da laget en søk knapp som da fetcher alt. vi slet i flere dager med dato filtrering på suggest, og bestemte oss derfor for å gi oss og la det være
        //Samtidig hadde vi tid til å fikse det så tankene gikk 24/7 på hvordan det kunne fikses. Vi visste fra start at suggest ikke har startdatetime parameter så noe annet måtte fikses. Når Ann-Charlott da anbefalte å bruke søke knapp, tenkte vi at en fetch er jo en funksjon
        //hva om vi fetcher alt når bruker trykker søk istedet for mange avhengigheter i useeffekten. Vi gjorde derfor det ved å bruke events, attractions og venues. Dette fungerte og vi endte da opp med å bruke denne løsningen fremfor suggest

        // Fetcher events
        fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD&keyword=${keywordcheck}&locale=*&countryCode=${code}&startDateTime=${date}&city=${categoryCity}`)
        .then(response => response.json()) //gjør om innholdet til javascript slik at det kan jobbes med
        .then(data => setEventsAPI(data._embedded?.events || [])) //lagrer fetch i en useState her, er data._embedded.events tom i fetchen lages en tom array, dette sikrer at siden ikke får error og kræsjer
        .catch(error => console.error("Feil ved events-fetch", error)); //logger feil dersom fetch ikke fungerer, lettere for oss å se hvor feilen ligger om den oppstår

        // Fetcher attractions
        fetch(`https://app.ticketmaster.com/discovery/v2/attractions?apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD&keyword=${keywordcheck}&locale=*&countryCode=${code}&startDateTime=${date}&city=${categoryCity}`)
        .then(response => response.json())
        .then(data => setAttractions(data._embedded?.attractions || [])) 
        .catch(error => console.error("Feil ved attractions-fetch", error));

        // Fetcher venues
        fetch(`https://app.ticketmaster.com/discovery/v2/venues?apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD&keyword=${keywordcheck}&locale=*&countryCode=${code}&startDateTime=${date}&city=${categoryCity}`)
        .then(response => response.json())
        .then(data => setVenues(data._embedded?.venues || []))
        .catch(error => console.error("Feil ved venues-fetch", error));
    };

    useEffect(() => {
        handleSearch();
    }, [apiCategory]); //Når vi endret logikken over (handleSearch) tok vi også bort useeffekten i starten. Når vi da sjekket nettsiden og trykket på for eks musikk kom det ingenting. Vi skjønte fort at vi måtte ha denne useeffekten for å kunne generere innhold når siden mountes
    // Vi hadde først ingen avhengigheter for når den useEffekten skulle kjøre, og da endret det seg ikke når vi trykket fra musikk til sport, da skjønte vi at vi også måtte ha med aåiCategory her slik at når apiCategory variabelen forandret seg skulle siden lastes på nytt med nytt innhold

    console.log("for å hente ut bilde", venues)

    return (
        <> {/*Ettersom det var en stund siden vi hadde vært igjennom dette, så måtte dette friskes opp litt. Der vi har brukt kilder vil det ligge kilde ved den biten */}
        <section className="filterSearch">
            <h2 className="categoryheading">{slug}</h2>
            <h3>Filtrert søk</h3>
            <form className="filterSearchForm">
                <label htmlFor="date"> {/*Her knyttes label og inputfeltet sammen, gir bedre tilgjengelighet*/}
                    <input
                    type="date" //ved å bruke denne får vi en datovelger på nettsiden
                    id="date"
                    value={date ? date.slice(0, 10) : ""} //Gjør om dato til yyyy - mm - dd, dette blir riktig i datovelgeren og er sånn typen date krever at det er. Dette sikrer at det blir riktig
                    onChange={(e) => setDate(`${e.target.value}T00:00:00Z`)} //I denne linjen sørger vi for at datoen som er valgt (som skjer i e.target.value), dette blir da for eks 2025-05-08 siden den skrive ut måten er definert på linjen over. 
                    //Det etter at dato er satt i useStaten så gjøres den om med å legge til noe etter slik at det blir riktig format for APIet. Så i dette tilfellet vil dato se slik ut: 2025-05-08T00:00:00Z, det det er det formatet som blir sendt i fetchen gjennom date
                    //onChange sier bare at om noe endrer seg så skal det nye lagres i staten
                    />
                </label>
                <label htmlFor="country"></label>
                <select className="selectbtn" id="country" name="country" value={country} onChange={(e) => setCountry(e.target.value)}>
                    <option value="Norge">Velg land</option> {/*Det blir satt til value Norge som default slik at det blir samme som usestate, da er det innhold når siden lastes*/}
                    <option value="Norge">Norge</option>
                    <option value="Sverige">Sverige</option>
                    <option value="Danmark">Danmark</option>
                    <option value="Frankrike">Frankrike</option>
                    <option value="Tyskland">Tyskland</option>
                </select>

                <label htmlFor="city"></label>
                <select className="selectbtn" id="city" name="city" value={categoryCity} onChange={(e) => setCity(e.target.value)}>
                    <option value="">Velg by</option>
                    <option value="Oslo">Oslo</option>
                    <option value="Stockholm">Stockholm</option>
                    <option value="København">København</option>
                    <option value="Paris">Paris</option>
                    <option value="Berlin">Berlin</option>
                </select>
                <button type="button" onClick={handleSearch}>Søk</button>
            </form>
            <SearchForm setKeyword={setKeyword} /> {/*Henter inn komponent og sender en prop for å kunne endre søkeordet*/}
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
            {attractions.length === 0 && attractions !== undefined && ( //Dette er inspirert av cheat sheet fra innføring i programmering
                <p>Ingen attraksjoner funnet.</p>
            )}

            </div>
        </section>
        <section>
            <h3 className="arrangementheading">Arrangementer</h3>
            <div className="arrangementflex">
            {eventsAPI.map(pass => (
                <div className="buttonflex" key={pass.id}>
                <EventCard pass={pass} />
                <a className="billetterbtn" href={pass.url} target="_blank">Kjøp billetter</a>
                <HeartIcon id={pass.id} />
                </div>
            ))}
            {eventsAPI.length === 0 && eventsAPI !== undefined && (
                <p>Ingen arrangementer funnet.</p>
            )}

            </div>
        </section>
        <section>
    <h3 className="arrangementheading">Spillesteder/eventsteder</h3>
  < div className="spillestedflex">
        {venues.map(attraction => (
        <div key={attraction.id}>
            <AttractionsCategoryPage attraction={attraction} storageLiked={storageLiked} />
            <HeartIcon id={attraction.id} />
        </div>
        ))}
    </div>

    {venues.length === 0 && venues !== undefined && (
        <p>Ingen spillsteder funnet.</p>
    )}
    </section> 
        </>
    );
    }
