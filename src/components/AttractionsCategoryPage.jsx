import HeartIcon from "./HeartIcon";
import "../styles/attractionsCategoryPage.scss"

export default function AttractionsCategoryPage({attraction, storageLiked}) {
    return(
        <>
            <h2>{attraction.name}</h2>
            <img src={attraction.images?.[0]?.url} alt={attraction.name}/>
            <span>
                <HeartIcon storageLiked={storageLiked} id="#"/>
            </span>
        </>
    )
}