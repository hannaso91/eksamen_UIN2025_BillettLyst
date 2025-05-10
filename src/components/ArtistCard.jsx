import "../styles/artistcard.scss"

export default function ArtistCard({ festivalpass }) {
    
    //Lager en tom array variabel til å pushe artistene inn i, slik at vi ikke får duplikater
    const filterWithPush = [];

    festivalpass.map(pass => { //trenger ikke key i denne og neste map ettersom vi ikke rendrer ut JSX elementer, det som skjer i map er kun javascript
        const attractions = pass?._embedded?.attractions; //Lager en variabel som går inn til neste array, slik at vi enkelt kan mappe oss frem til det vi ønsker å få ut

        attractions?.map(artist => {
            // Sjekk om artisten allerede finnes i listen basert på id, pusher inn dersom den ikke finnes. Dette gir oss en liste av artistene 1 gang og ikke flere ganger pr festivalpass
            // Hvert festivalpass har artister lagret, det ble veldig mange og vi valgte derfor å gjøre det på denne måten. Da sikrer vi også at alle er listet opp under den gitte festivalen
            const alreadyAdded = filterWithPush.find(a => a.id === artist.id);

            if (!alreadyAdded) { // Denne linjen sier at hvis det som er i alreadyadded variabelen IKKE eksisterer fra før så skal artisten pushes inn i arrayen som er skrevet på linje 5.
                filterWithPush.push(artist);
            }
        });
    });

    console.log("push filter", filterWithPush)

    if (filterWithPush.length === 0) return <p>Ingen artister funnet i festivalpass</p>; //la til en sikring her, fant ut at nettsiden kræsjet flere ganger om det tok litt tid å hente fra apiet. Ved å lage en sikring her slappp vi at siden kræsjet

    //På linje 27 har det blitt brukt kode fra W3Schools for å få en heltrukken linje. Hentet fra: https://www.w3schools.com/tags/tag_hr.asp Dato: 05.05.25
    return (
        <> {/*Under her blir det som er pushet inn i den tomme arrayen mappet ut slik at det kan skrives ut på nettsiden. Div som er laget er kun for bruk i css og har ingen semantisk betydning*/}
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