import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import { useEffect, useState } from "react";

export default function Welcome({ me, friend }) {
  const [ticketmasterAPI, setTicketmasterAPI] = useState();

  const purchaseId = me?.previousPurchases?.map(p => p.apiid) || [];
  const wishlistId = me?.wishlist?.map(w => w.apiid) || [];  

  const allEventIds = [...new Set([...purchaseId, ...wishlistId])];
  const idString = allEventIds.join(",");

  console.log("purchaseId:", purchaseId);
  console.log("wishlistId:", wishlistId);
  console.log("idString:", idString);


  const fetchFromTicketmasterAPI = () => {
    if (idString.length === 0) return;
  
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?country=NO&apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD&id=${idString}&locale=*`)
      .then(response => response.json())
      .then(data => {
        console.log("Ticketmaster respons:", data);
        setTicketmasterAPI(data._embedded?.events || []);
      })
      .catch(error => {
        console.error("Feil ved henting av eventer:", error);
      });
  };
  

  useEffect(() => {
    if (me) {
      fetchFromTicketmasterAPI();
    }
  }, [me]);
  

  if (!ticketmasterAPI) {
    return <p>Laster inn arrangementer fra Ticketmaster...</p>;
  }

 

  const purchases = ticketmasterAPI.filter(event => purchaseId.includes(event.id));
  const wishlist = ticketmasterAPI.filter(event => wishlistId.includes(event.id));

  const myWishList = wishlistId;
  const friendWishList = friend?.wishlist.map(wish => wish._ref) || [];

  const commonWishes = myWishList.filter(ref => friendWishList.includes(ref));
  const commonWishesEvents = ticketmasterAPI.filter(event => commonWishes.includes(event.id));

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
          <Link to={`/sanity-event/${pass.id}`}>
            <EventCard pass={pass} />
          </Link>
        </div>
      ))}

      <h2>Ønskeliste</h2>
      {wishlist.map(pass => (
        <div key={pass.id}>
          <Link to={`/sanity-event/${pass.id}`}>
            <EventCard pass={pass} />
          </Link>
        </div>
      ))}
    </>
  );
}
