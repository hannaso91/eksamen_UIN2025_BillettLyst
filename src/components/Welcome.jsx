  import { Link } from "react-router-dom";
  import EventCard from "./EventCard";
  import { useEffect, useState } from "react";
  import "../styles/mypage.scss";

  export default function Welcome({ me, friends = [] }) {
    const [ticketmasterAPI, setTicketmasterAPI] = useState([]);

    const purchaseId = me?.previousPurchases?.map(p => p.apiid) || []; //på denne og linjen under henter vi inn alle ID-er som ligger lagret på sanity, det ligger lagret i apiid som vi selv har definert i schema
    const wishlistId = me?.wishlist?.map(w => w.apiid) || []; //previousPurchases og wishlist er også fra apiet. Det må mappes ut da det er definert som en array i schema
    const allEventIds = [...new Set([...purchaseId, ...wishlistId])]; // Link til kilde brukt her https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set og https://www.w3schools.com/js/js_sets.asp da unngår vi duplikater og sikrer oss mot det. Pakker også ut begge to
    const idToString = allEventIds.join(","); //Denne kodebiten lagrer alt som ligger i allEventsIds til en string med komma mellom hver


    //Henter i denne biten inn detaljer fra ticketmaster API om de ulike eventene som bruker har i listene sine i sanity med variabelen over. 
    const fetchFromTicketmasterAPI = () => {
      fetch(`https://app.ticketmaster.com/discovery/v2/events.json?country=NO&apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD&id=${idToString}&locale=*`)
        .then(response => response.json())
        .then(data => {
          setTicketmasterAPI(data._embedded?.events || []);
        })
        .catch(error => {
          console.error("Feil ved henting av eventer:", error);
        });
    };

    // La inn en if i denne useeffekten, slik at den ikke gjør noe før me er true og tilgjengelig. Endrer me seg så kjører den på nytt
    useEffect(() => {
      if (me) {
        fetchFromTicketmasterAPI();
      }
    }, [me]);

    //Filtrerer ut hvilke events brukeren har i ønskeliste og hvilke som er i ønskeliste og lagrer disse i en variabel
    const purchases = ticketmasterAPI.filter(event => purchaseId.includes(event.id));
    const wishlist = ticketmasterAPI.filter(event => wishlistId.includes(event.id));

    return (
      <>
        <h1>Dashboard</h1>
        <section className="myprofile">
          <h2>Velkommen {me?.name}</h2>
          <img src={me?.image?.asset?.url} alt={me?.name} className="imgMe" />
          <p>Alder: {me?.age}</p>
          <p>Kjønn: {me?.gender}</p>
        </section>
        <section className="friends">
          <h2>Venner</h2>
          {friends.map(f => { //Har valgt å legge map og filter inne i denne mappen, dette forenkler koden. Hadde vi gjort kodene under utenfor map hadde vi hatt en commonWishes verdi for alle og det hadde ikke fungert. Det fant vi ut ettersom koden først ble plassert utenfor map
          // For hver venn så skal ønskeliste hentes for akkurat den vennen
            const friendWishList = f?.wishlist?.map(w => w.apiid?.trim()) || []; //trimmer apiid for å sikre at det er rent uten mellomrom før eller etter 
            const commonWishes = wishlistId.filter(ref => friendWishList.includes(ref)); // Her filtrerer vi ut det som bruker som er logget inn har i sin ønskeliste med det som vennene har
            const commonWishesEvents = ticketmasterAPI.filter(event => commonWishes.includes(event.id)); // her finner vi de faktiske eventene for de felles ønskene i ticketmaster api så vi kan bruke data derfra
            return (
              <div className="friendsCard" key={f._id}>
                <img src={f?.image?.asset?.url} alt={f?.name} className="imgFriend" />
                <h4>{f?.name}</h4>
                <div className="text">
                  {commonWishesEvents.length > 0 ? (
                    commonWishesEvents.map(event => (
                      <p key={event.id}>
                        Du og {f?.name} ønsker begge å dra på {event.name}. Hva med å dra sammen?
                      </p>
                    ))
                  ) : (
                    <p>Ingen felles ønsker med {f?.name}.</p>
                  )}
                </div>
              </div>
            );
          })}
        </section>
        <section className="buy">
          <h2>Mine kjøp</h2>
          {purchases.map(pass => (
            <div key={pass.id}> {/*CSS og key formål*/}
              <Link to={`/sanity-event/${pass.id}`} state={{ me, friends }}>
                <EventCard pass={pass} />
              </Link>
            </div>
          ))}
        </section>
        <section className="buy">
          <h2>Ønskeliste</h2>
          {wishlist.map(pass => (
            <div key={pass.id}>
              <Link to={`/sanity-event/${pass.id}`} state={{ me, friends }}>
                <EventCard pass={pass} />
              </Link>
            </div>
          ))}
        </section>
      </>
    );
  }
