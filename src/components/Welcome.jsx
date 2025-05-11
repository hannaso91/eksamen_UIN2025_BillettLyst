import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import { useEffect, useState } from "react";
import "../styles/mypage.scss"

export default function Welcome({ me, friend }) {
  const [ticketmasterAPI, setTicketmasterAPI] = useState([]);

  // henter her id-er fra brukerens kjøp fra tidligere og brukerens ønskeliste. La også inn en sjekk for at om det ikke eksisterer så returner en som array, slik at vi unngår at siden kræsjer
  // me og friend kommer som props fra app.jsx, blir sendt fra toppen fordi det brukes flere plasser.
  const purchaseId = me?.previousPurchases?.map(p => p.apiid) || [];
  const wishlistId = me?.wishlist?.map(w => w.apiid) || [];  


  const allEventIds = [...new Set([...purchaseId, ...wishlistId])]; //aldri vært borti new set, men vi fikk duplikater og måtte finne en løsning for det, fant da denne siden https://stackoverflow.com/questions/37217953/removing-duplicate-array-values-and-then-storing-them-react og testet flere av de metodene som er listet her.
  // new set fungerte slik vi ønsket. 

  const idToString = allEventIds.join(",");// her måtte vi gjøre det om slik at ticketmaster sitt api skulle godta det. Id listen blir da en string med komma mellom, slik at APIet klarer å lese det. Join var vi innom i innfprog

  // vi konsoll logget underveis for å ha kontroll
  console.log("purchaseId:", purchaseId);
  console.log("wishlistId:", wishlistId);
  console.log("idString:", idToString);
  


  // henter her event data for de ulike arrangementene basert på den stringen som ble omgjort lenger oppe slik at ticketmaster api forstår det som sendes inn i fetchen.
  const fetchFromTicketmasterAPI = () => {  
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?country=NO&apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD&id=${idToString}&locale=*`)
      .then(response => response.json())
      .then(data => {
        console.log("Ticketmaster respons:", data);
        setTicketmasterAPI(data._embedded?.events || []);
      })
      .catch(error => {
        console.error("Feil ved henting av eventer:", error);
      });
  };
  
  // useeffekt her kjører når me er tilgjengelig, altså at en bruker er logget inn og den som logget inn blir lagret i me. Derfor sjekken, den useeffekten bør ikke kjøres før noen er me
  useEffect(() => {
    if (me) {
      fetchFromTicketmasterAPI();
    }
  }, [me]);

  //her bruker vi filter for å filtrere ut det som bruker har i sin ønskeliste og tidligere kjøp liste, uten denne vår vi ikke bare de som er i de listene men flere
  const purchases = ticketmasterAPI.filter(event => purchaseId.includes(event.id));
  const wishlist = ticketmasterAPI.filter(event => wishlistId.includes(event.id));

  //på de to linjene under lagrer vi ønskeliste ider for bruker og venn, dette for å kunne sammenlikne i filter under
  const myWishList = wishlistId;
  const friendWishList = friend?.wishlist.map(wish => wish.apiid?.trim()) || [];

  // dette filteret finner ut hvilke ønsker begge har i sin ønskeliste
  const commonWishes = myWishList.filter(ref => friendWishList.includes(ref));

  // filteret under finner de eventene som matcher felles ønsker.
  const commonWishesEvents = ticketmasterAPI.filter(event => commonWishes.includes(event.id.trim()));

  return (
    <>
      <h1>Dashboard</h1>
      <h2>Velkommen {me?.name}</h2>
      <img src={me?.image?.asset?.url} alt={me?.name} />
      <p>Alder: {me?.age}</p>
      <p>Kjønn: {me?.gender}</p>

      <h2>Venner</h2>
      <img src={friend?.image?.asset?.url} alt={friend?.name} />
      <p>{friend?.name}</p>
      {commonWishesEvents.map(event => (
        <p key={event.id}>
          Du og {friend?.name} ønsker begge å dra på {event.name}. Hva med å dra sammen?
        </p>
      ))}

      <h2>Mine kjøp</h2>
      {purchases.map(pass => (
        <div key={pass.id}>
          <Link to={`/sanity-event/${pass.id}`} state={{me, friend}}> {/*https://dev.to/thatfemicode/passing-data-states-through-react-router-8dh*/}
            <EventCard pass={pass} />
          </Link>
        </div>
      ))}

      <h2>Ønskeliste</h2>
      {wishlist.map(pass => (
        <div key={pass.id}>
          <Link to={`/sanity-event/${pass.id}`} state={{me, friend}}>
            <EventCard pass={pass} />
          </Link>
        </div>
      ))}
    </>
  );
}
