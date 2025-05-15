import "../styles/attractionsCategoryPage.scss"

export default function AttractionsCategoryPage({attraction}) { //Lagde en egen til categorypage for listing av attraksjoner og spillsteder. Arrangementer bruker eventcard
    return(
        <article className="attractionCard">
            <h2>{attraction.name}</h2>
            {attraction.images?.length > 0 ? ( //legger inn en sjekk for å slippe error som oppgaven sier vi ikke skal ha
                <img src={attraction.images[0].url} alt={`Bilde av ${attraction.name}`} />
            ) : (
                <p>Ingen bilde tilgjengelig</p>
            )}
        </article>
    )
}