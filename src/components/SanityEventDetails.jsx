import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchByAPIinSanity } from "../sanity/arrangement";
import "../styles/myPurchases.scss";

export default function SanityEventDetails() {
    const { apiId } = useParams(); //Henter apiid fra url. 
    const [eventSanity, setEventSanity] = useState(); // lagrer data vi fetcher inn fra Sanity
    const [ticketmasterData, setTicketmasterData] = useState(); // lagrer data vi fetcher fra ticketmaster API basert på staten over

    const location = useLocation() //leste om dette her https://dev.to/thatfemicode/passing-data-states-through-react-router-8dh, det gjelder også koden på linjen under her
    const {me, friend} = location.state || {}


    console.log("api id fra url", apiId); // sjekker at det vi får inn gjennom routing samsvarer med apiid lagret i sanity og ticketmaster

    // her henter vi inn data fra Sanity basert på useparams
    const fetchFromAPI = async (apiId) => {
        const data = await fetchByAPIinSanity(apiId);
        setEventSanity({...data, apiid: data.apiid.trim()}); // i konsoll loggen over, så vi at id fra API og sanity ikke matchet og derfor fungerte det ikke. Det var et mellomrom på slutten, la derfor inn en sikkerhet slik at de er like ved bruk av trim() som fjerner mellomrom før og etter
    };

    // Her henter vi inn event informasjon fra ticketmaster basert på apiid fra sanity. Bruker eventSanity.apiid i fetchen, den skal da samsvare med id i ticketmaster
    const getDataFromTicketmaster = async () => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events/${eventSanity.apiid}.json?apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD`)
        .then((response) => response.json())
        .then((data) => {
            setTicketmasterData(data);
        })
    };

    // useeffekten her har flere avhengigheter. Først så kjører den når siden lastes, og når apiId endres. apiId kommer fra useParams mens apiid med liten i kommer fra sanity
    useEffect(() => {
        fetchFromAPI(apiId);
    }, [apiId]);

    console.log("Sanity-data:", eventSanity);
    console.log("Ticketmaster ID vi prøver å hente:", eventSanity?.apiid); //fikk ikke ut noe i starten og konsoll logget derfor disse to loggene
    // fant senere ut at det var feil i routingen, da vi så i konsollen at den prøvde å rendre eventpage istedet for dette. Vi hadde da skrevet /event/${apiId} istedet for /sanity-event/${apiId}, når det ble oppdaget etter mange timer så fungerte alt


    // her la vi til en if test, dette for å vente med å kjøre denne frem til eventsanity.apiid var true (altså har innhold)
    useEffect(() => {
        if (eventSanity?.apiid) {
        getDataFromTicketmaster();
        }
    }, [eventSanity]);

    console.log("fetch fra ticketmaster:", ticketmasterData); //denne konsoll loggen ble også laget før vi fant ut at det var routingen som var problemet

    const wishlistOwners = [] // Lager en liste over brukere som har eventet som er klikket på i sin ønskeliste


    // Her lager vi en sjekk, denne var mye prøve og feile før vi fikk syntaksen riktig. Har gått tilbake på tidligere cheat sheet i programmering og i UIN for å komme frem til en løsning
    // Denne sjekken sjekker om den som er lagret som "me" har arrangementet i sin ønskeliste. Her bruker vi find, hvis apiid i sanity er lik det som kommer fra useparams, blir det pushet inn
    if (me?.wishlist?.find(w => w.apiid?.trim() === apiId?.trim())) { //trimmer her også som vi også gjør lenger oppe, dette for å sikre at ingen av de har mellomrom siden vi oppdaget at den ene hadde mellomrom
        wishlistOwners.push({ name: me.name, image: me.image }); //Her pusher vi inn et objekt til arrayen som holder på nøklene name og image, slik at vi får hentet dette ut når vi skal skrive det ut i return
    }

    // gjør det samme med "friend" som med "me".
    if (friend?.wishlist?.find(w => w.apiid?.trim() === apiId?.trim())) {
        wishlistOwners.push({ name: friend.name, image: friend.image });

    }

    console.log("wishlistOwners", wishlistOwners); //dette er også en konsoll logg etter problemene vi hadde med routingen før routingen ble oppdaget.



    return (
        <>
        <h2>{eventSanity?.title}</h2>
            <>
                <img src={ticketmasterData?.images?.[0].url} alt={`bilde fra eventet ${ticketmasterData?.name}`}/>
                <section className="mittkjop">
                    <h3>Sted og dato</h3>
                    <p>Dato: {ticketmasterData?.dates?.start?.localDate}</p>
                    <p>Sted: {ticketmasterData?.dates?.timezone}</p>
                </section> 
                <section className="sjanger">
                    <h3>Sjanger</h3>
                    <p>{ticketmasterData?.classifications?.[0]?.genre?.name}</p>
                    <p>{ticketmasterData?.classifications?.[0]?.segment?.name}</p>
                    <p>{ticketmasterData?.classifications?.[0]?.subGenre?.name}</p>
                </section>
                <a href={ticketmasterData?.url} target="_blank">
                    Kjøp billetter her
                </a>
                <section className="wishlist">
                    <h3>Hvem har dette i ønskelista</h3>
                        {wishlistOwners.map(name =>
                            <article key={name.name}>
                                <img src={name.image?.asset?.url} />
                                <p>{name.name}</p>
                            </article>
                        )}
                </section>
            </>
        </>
    );
}
