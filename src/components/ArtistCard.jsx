import "../styles/artistcard.scss"

export default function ArtistCard({ festivalpass }) {
    
    const filterWithPush = [];

    festivalpass.map(pass => {
        const attractions = pass?._embedded?.attractions;

        attractions?.map(artist => {
            // Sjekk om artisten allerede finnes i listen basert på id, pusher inn dersom den ikke finnes
            const alreadyAdded = filterWithPush.find(a => a.id === artist.id);

            if (!alreadyAdded) {
                filterWithPush.push(artist);
            }
        });
    });

    console.log("push filter", filterWithPush)

    if (filterWithPush.length === 0) return <p>Ingen artister funnet i festivalpass</p>;

    //På linje 27 har det blitt brukt kode fra W3Schools for å få en heltrukken linje. Hentet fra: https://www.w3schools.com/tags/tag_hr.asp Dato: 05.05.25
    return (
        <>
        <hr className="sepLine"></hr>
            <h2 className="artistHeading">Artister</h2>
            <div className="flexartistcard">
            {filterWithPush.map(artist => (
                
                    <article id="artistcard" key={artist.id}>
                        <img src={artist.images?.[0]?.url}/>
                        <h3>{artist?.name}</h3>
                    </article>
                
            ))}
            </div>
        </>
    );
}