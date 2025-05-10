import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchByAPIinSanity } from "../sanity/arrangement";

export default function SanityEventDetails() {
    const { apiId } = useParams();
    const [eventSanity, setEventSanity] = useState();
    const [ticketmasterData, setTicketmasterData] = useState();

    const location = useLocation()
    const {me, friend} = location.state || {}


    console.log("api id fra url", apiId);

    const fetchFromAPI = async (apiId) => {
        const data = await fetchByAPIinSanity(apiId);
        setEventSanity({...data, apiid: data.apiid.trim()});
    };

    const getDataFromTicketmaster = async () => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events/${eventSanity.apiid}.json?apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD`)
        .then((response) => response.json())
        .then((data) => {
            if (data) {
            setTicketmasterData(data);
            }
        })
    };

    useEffect(() => {
        fetchFromAPI(apiId);
    }, [apiId]);

    console.log("Sanity-data:", eventSanity);
    console.log("Ticketmaster ID vi prøver å hente:", eventSanity?.apiid);


    useEffect(() => {
        if (eventSanity?.apiid) {
        getDataFromTicketmaster();
        }
    }, [eventSanity]);

    console.log("fetch fra ticketmaster:", ticketmasterData);

    const wishlistOwners = []



    if (me?.wishlist?.find(w => w.apiid?.trim() === apiId?.trim())) {
        wishlistOwners.push({ name: me.name, image: me.image });
    }

    if (friend?.wishlist?.find(w => w.apiid?.trim() === apiId?.trim())) {
        wishlistOwners.push({ name: friend.name, image: friend.image });

    }

    console.log("wishlistOwners", wishlistOwners);



    return (
        <>
        <h2>{eventSanity?.title}</h2>
            <>
                <img src={ticketmasterData?.images?.[0].url} alt={`bilde fra eventet ${ticketmasterData?.name}`}/>
                <section>
                    <h3>Sted og dato</h3>
                    <p>Dato: {ticketmasterData?.dates?.start?.localDate}</p>
                    <p>Sted: {ticketmasterData?.dates?.timezone}</p>
                </section> 
                <section>
                    <h3>Sjanger</h3>
                    <p>{ticketmasterData?.classifications?.[0]?.genre?.name}</p>
                    <p>{ticketmasterData?.classifications?.[0]?.segment?.name}</p>
                    <p>{ticketmasterData?.classifications?.[0]?.subGenre?.name}</p>
                </section>
                <a href={ticketmasterData?.url} target="_blank">
                    Kjøp billetter her
                </a>
                <section>
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
