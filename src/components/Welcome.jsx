import { Link } from "react-router-dom"

export default function Welcome({ me, friend, arrangement }) {

  // Lag en liste med _id-er fra previousPurchases og wishlist. Bruker _ref her fordi det er det som ligger inne i previousPurchases
  const purchaseId = me?.previousPurchases?.map(p => p._ref) || [];
  const wishlistId = me?.wishlist?.map(w => w._ref) || [];

  // Filtrer arrangementene ut fra referansene over. Henter da ut fra det som ligger i arrangementet og viser det arrangementet basert på id
  const purchases = arrangement.filter(event => purchaseId.includes(event._id));
  const wishlist = arrangement.filter(event => wishlistId.includes(event._id));

  //Ettersom _ref og _id har samme verdien, så kan vi filtrere på bakgrunn av dette Derfor henter vi ut _ref fra de første const
  // Før vi deretter filtrer ut de eventene i fetchen som henter arrangementer. Da kan vi definere hva vi ønsker at skal skrives ut

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
      <p>Du og {friend?.name} ønsker begge å dra på Findings Festival. Hva med å dra sammen?</p>

      <h2>Mine kjøp</h2>
      {purchases.map(event => (
        <div key={event._id}>
          <p>{event.title}</p>
          <Link to={`/sanity-event/${event.apiId}`}>Se mer om dette kjøpet</Link>
        </div>
      ))}

      <h2>Ønskeliste</h2>
      {wishlist.map(event => (
        <div key={event._id}>
          <p>{event.title}</p>
          <Link to={`/sanity-event/${event.apiId}`}>Se mer om dette arrangementet</Link>
        </div>
      ))}
    </>
  );
}
