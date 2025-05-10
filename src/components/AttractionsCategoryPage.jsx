import HeartIcon from "./HeartIcon";
import "../styles/attractionsCategoryPage.scss"

export default function AttractionsCategoryPage({attraction}) {
    return(
        <article className="attractionCard">
            <h2>{attraction.name}</h2>
            <img src={attraction.images?.[0]?.url} alt={attraction.name}/>
            
        </article>
    )
}