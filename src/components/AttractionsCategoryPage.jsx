import "../styles/attractionsCategoryPage.scss"

export default function AttractionsCategoryPage({attraction}) { //Lagde en egen til categorypage for listing av attraksjoner og spillsteder. Arrangementer bruker eventcard
    return(
        <article className="attractionCard">
            <h2>{attraction.name}</h2>
            <img src={attraction.images?.[0]?.url} alt={attraction.name}/>
        </article>
    )
}