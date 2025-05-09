import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchByAPIinSanity } from "../sanity/arrangement";

export default function SanityEventDetails() {
  const { apiId } = useParams();
  const [eventSanity, setEventSanity] = useState();
  const [ticketmasterData, setTicketmasterData] = useState();

  console.log("api id fra url", apiId);

  const fetchFromAPI = async (apiId) => {
    const data = await fetchByAPIinSanity(apiId);
    setEventSanity(data);
  };

  const getDataFromTicketmaster = async () => {
    fetch(`https://app.ticketmaster.com/discovery/v2/events/${eventSanity.apiId}.json?apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log("Ticketmaster event:", data);
          setTicketmasterData(data);
        } else {
          console.warn("Ingen data fra Ticketmaster:", data);
          setTicketmasterData(null);
        }
      })
      .catch((error) => {
        console.error("Feil ved henting fra Ticketmaster:", error);
      });
  };

  useEffect(() => {
    fetchFromAPI(apiId);
  }, [apiId]);

  useEffect(() => {
    if (eventSanity?.apiId) {
      getDataFromTicketmaster();
    }
  }, [eventSanity]);

  console.log("fetch fra Sanity:", eventSanity);

  return (
    <>
      <h2>{eventSanity?.name}</h2>
      {ticketmasterData ? (
        <>
          <p>{ticketmasterData.name}</p>
          <p>{ticketmasterData.dates?.start?.localDate}</p>
          <a href={ticketmasterData.url} target="_blank" rel="noreferrer">
            Se på Ticketmaster
          </a>
        </>
      ) : (
        <p>Laster inn data fra Ticketmaster...</p>
      )}
    </>
  );
}
