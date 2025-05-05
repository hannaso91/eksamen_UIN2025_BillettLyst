import "../styles/artistcard.scss"

export default function ArtistCard({ festivalpass }) {
    
    const filterWithPush = [];

    festivalpass.map(pass => {
        const attractions = pass._embedded?.attractions;

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

    return (
        <>
            <h2>Artister</h2>
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