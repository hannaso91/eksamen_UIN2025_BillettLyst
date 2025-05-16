import "../styles/artistcard.scss"

export default function ArtistCard({ festivalpass }) {
    
    //Lager en tom array variabel til å pushe artistene inn i, slik at vi ikke får duplikater. Uten at vi pushet inn fikk vi artister flere ganger siden det er flere pass på hver festival. Artistene ligger lagret i hvert pass
    //Når vi da mappet ut, som vi gjorde først, fikk vi alle artistene ramset opp for hvert eneste pass. Det trengte vi ikke og derfor gjorde vi det på denne måten
    const filterWithPush = [];

    festivalpass.map(pass => { //trenger ikke key i denne og neste map der vi mapper attractions ettersom vi ikke rendrer ut JSX elementer, det som skjer i map er kun javascript og skal kun ha en funksjon og ingen utskrift til nettsiden
        const attractions = pass?._embedded?.attractions; //Lager en variabel som går inn til neste array, slik at vi enkelt kan mappe oss frem til det vi ønsker å få ut

        attractions?.map(artist => {
            // Sjekk om artisten allerede finnes i listen basert på id, pusher inn dersom den ikke finnes. Dette gir oss en liste av artistene 1 gang og ikke flere ganger pr festivalpass
            // Nå sikrer vi også at alle er listet opp under den gitte festivalen, uten å ta hensyn til pass/dag. Testet frem og tilbake med filter og fint, her fungerte find best
            const alreadyAdded = filterWithPush.find(a => a.id === artist.id);

            if (!alreadyAdded) { // Denne linjen sier at hvis det som er i alreadyadded variabelen IKKE eksisterer fra før så skal artisten pushes inn i arrayen som er skrevet på linje 7.
                filterWithPush.push(artist); //pusher inn det som ligger i artist, det som kommer ut etter map og filtrering
            }
        });
    });

    console.log("push filter", filterWithPush) //måtte konsoll logge underveis for å se at vi fikk pushet inn noe, opplevde først at den var tom og måtte finne ut hvorfor, da hadde vi glemt å skrive ! i if testen. 

    if (filterWithPush.length === 0) return <p>Ingen artister funnet</p>; //la til en sikring her, fant ut at nettsiden kræsjet flere ganger om det tok litt tid å hente fra apiet. Ved å lage en sikring her slappp vi at siden kræsjet
    //denne sikringen sier egentlig bare at dersom variabelen/arrayen vi opprettet på linje 7 er tok, så skal det komme en tekst som sier at artister ikke er funnet

    //På linje 31 har det blitt brukt kode fra W3Schools for å få en heltrukken linje. Hentet fra: https://www.w3schools.com/tags/tag_hr.asp Dato: 05.05.25
    return (
        <> {/*Under her blir det som er pushet inn i den tomme arrayen mappet ut slik at det kan skrives ut på nettsiden. Div som er laget er kun for bruk i css og har ingen semantisk betydning*/}
        <hr className="sepLine"></hr>
            <h2 className="artistHeading">Artister</h2>
            <div className="flexartistcard">
            {filterWithPush.map(artist => ( //mapper ut alt som ligger i den tomme arrayen vi opprettet, som ikke lenger er tom. Her brukes key ettersom det skal skrives JSX
                    <article className="artistcard" key={artist.id}>
                        <img src={artist.images?.[0]?.url}/>
                        <h3>{artist?.name}</h3>
                    </article>
            ))}
            </div>
        </>
    );
}