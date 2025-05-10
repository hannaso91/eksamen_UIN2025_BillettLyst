import "../styles/venuesCategoryPage.scss"

export default function VenuesCategoryPage ({venue}) {
    return(
        // Det ble veldig mye kode på categorypage, så for å få litt bedre oversikt lagde vi komponenter til dette
        <>
            <h2>{venue.name}</h2>
            <img src={venue.images?.[0]?.url} alt={venue.name}/>
        </>
    )
}