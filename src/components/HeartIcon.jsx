import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeart } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

export default function HeartIcon() {
    const [liked, setLiked] = useState (false) //Setter til default false så hjertet ikke er klikket 
    const handleClick = () => {
        setLiked(!liked) //Denne bytter mellom true og false, utropstegnet bytter fra den staten den allerede er i, setter det motsatte
    }
    return(
        <button onClick={handleClick}>
            <FontAwesomeIcon icon={faHeart} color={liked ? "red" : "gray"} />
        </button>
    )
}