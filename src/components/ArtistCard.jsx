export default function ArtistCard({festivalpass}) {
    return(
        <>
        {festivalpass.map(artist => 
        <div key={artist.id}>
            <h3>{artist._embedded?.attractions?.[0]?.name}</h3> {/*Får ut bare i array 0 her, usikker på hvordan jeg skal få ut alle artister*/}
        </div>
        )}
        </>
    )
}