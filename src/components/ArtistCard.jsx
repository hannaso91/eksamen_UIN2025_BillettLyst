export default function ArtistCard({festivalpass}) {

    const attractions = festivalpass[0]._embedded.attractions

    return(
        <>
        {attractions.map(artist => 
        <div key={artist.id}>
            <h3>{artist.name}</h3> {/*Får ut bare i array 0 her, usikker på hvordan jeg skal få ut alle artister*/}
        </div>
        )}
        </>
    )
}