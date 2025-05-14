  import { Link } from "react-router-dom";
  import EventCard from "./EventCard";
  import { useEffect, useState } from "react";
  import "../styles/mypage.scss";

  export default function Welcome({ me, friends = [] }) {
    const [ticketmasterAPI, setTicketmasterAPI] = useState([]);

    const purchaseId = me?.previousPurchases?.map(p => p.apiid) || [];
    const wishlistId = me?.wishlist?.map(w => w.apiid) || [];
    const allEventIds = [...new Set([...purchaseId, ...wishlistId])];
    const idToString = allEventIds.join(",");

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

    useEffect(() => {
      if (me) {
        fetchFromTicketmasterAPI();
      }
    }, [me]);

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
          {friends.map(f => {
            const friendWishList = f?.wishlist?.map(w => w.apiid?.trim()) || [];
            const commonWishes = wishlistId.filter(ref => friendWishList.includes(ref));
            const commonWishesEvents = ticketmasterAPI.filter(event => commonWishes.includes(event.id));

            return (
              <div key={f._id}>
                <img src={f?.image?.asset?.url} alt={f?.name} className="imgFriend" />
                <p>{f?.name}</p>
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
            <div key={pass.id}>
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
