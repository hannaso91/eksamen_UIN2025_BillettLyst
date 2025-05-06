import HeartIcon from "./HeartIcon";
import "../styles/attractionsCategoryPage.scss"

export default function AttractionsCategoryPage({attraction, storageLiked}) {
    return(
        <article>
            <h2>{attraction.name}</h2>
            <img src={attraction.images?.[0]?.url} alt={attraction.name}/>
            <span> {/*Legger inn en span her som kun skal inneholde et hjerteikon ok har ingen semantisk betydning*/}
                <HeartIcon storageLiked={storageLiked} id="#"/>
            </span>
        </article>
    )
}