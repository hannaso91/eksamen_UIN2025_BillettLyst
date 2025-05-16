// Importerer nødvendige hooks og funksjoner
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchByAPIinSanity } from "../sanity/arrangement";
import { fetchMember } from "../sanity/member";
import "../styles/wishlistevents.scss"

export default function SanityEventDetails() {
  // Henter apiId fra URL (f.eks. /sanity-event/:apiId)
  const { apiId } = useParams();

  // State for å lagre data fra Sanity, Ticketmaster og brukere som har eventet i ønskelisten sin
  const [eventSanity, setEventSanity] = useState();
  const [ticketmasterData, setTicketmasterData] = useState();
  const [wishlistOwners, setWishlistOwners] = useState([]);

  // Funksjon som henter arrangement-data fra Sanity basert på apiId
  const getSanityEvent = () => {
    fetchByAPIinSanity(apiId)
      .then(data => {
        // Trimmer apiid for å unngå feil ved sammenligning senere, den fjerner mellomrom før og etter
        setEventSanity({ ...data, apiid: data.apiid.trim() });
      })
      .catch(error => console.error("Feil fra Sanity:", error));
  };

  // Funksjon som henter detaljer om arrangementet fra Ticketmaster API
  const getTicketmasterData = (id) => {
    fetch(`https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD`)
      .then(response => response.json())
      .then(data => {
        setTicketmasterData(data);
      })
      .catch(error => console.error("Feil fra Ticketmaster:", error));
  };

  // Henter alle brukere fra Sanity og sjekker hvem som har eventet i ønskelisten
  const findWishlistOwners = () => {
    fetchMember()
      .then(users => {
        const matches = users.filter(user =>
          user?.wishlist?.some(w => w.apiid?.trim() === apiId.trim()) // Sammenligner apiId fra URL med brukeres ønskelister
        );
        setWishlistOwners(matches);
      })
      .catch(error => console.error("Feil ved henting av brukere:", error));
  };

  // useEffect kjører når apiId endres (typisk ved navigasjon til en ny event-side)
  // Henter event-informasjon fra Sanity og finner hvem som har det i ønskelisten
  useEffect(() => {
    getSanityEvent();
    findWishlistOwners();
  }, [apiId]);

  // Når vi har fått eventet fra Sanity, henter vi detaljer fra Ticketmaster basert på apiid
  useEffect(() => {
    if (eventSanity?.apiid) {
      getTicketmasterData(eventSanity.apiid);
    }
  }, [eventSanity]);

  return (
    <>
    <div className="sanityeventdesign">
      <h2>{eventSanity?.title}</h2>

      <>
        {/* Viser bilde fra Ticketmaster (hvis tilgjengelig) */}
        <img
          src={ticketmasterData?.images?.[0].url}
          alt={`bilde fra eventet ${ticketmasterData?.name}`}
        />

        {/* Viser sted og dato for arrangementet */}
        <section>
          <h3>Sted og dato</h3>
          <p>Dato: {ticketmasterData?.dates?.start?.localDate}</p>
          <p>Sted: {ticketmasterData?.dates?.timezone}</p>
        </section>

        {/* Viser informasjon om sjanger */}
        <section>
          <h3>Sjanger</h3>
          <p>{ticketmasterData?.classifications?.[0]?.genre?.name}</p>
          <p>{ticketmasterData?.classifications?.[0]?.segment?.name}</p>
          <p>{ticketmasterData?.classifications?.[0]?.subGenre?.name}</p>
        </section>

        {/* Lenke til Ticketmaster for å kjøpe billetter */}
        <a
          href={ticketmasterData?.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Kjøp billetter her
        </a>

        {/* Viser hvilke brukere som har dette eventet i ønskelisten */}
        <section>
          <h3>Hvem har dette i ønskelista</h3>

          {wishlistOwners.length > 0 ? (
            wishlistOwners.map(person => (
              <article key={person._id}>
                <img src={person.image?.asset?.url} alt={person.name} />
                <p>{person.name}</p>
              </article>
            ))
          ) : (
            <p>Ingen har dette i ønskelista.</p>
          )}
        </section>

      </>
    </div>
    </>
  );
}
