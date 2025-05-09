import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from 'react';

export default function HeartIcon({id}) {
    const [liked, setLiked] = useState (false) //Setter til default false så hjertet ikke er klikket 

    useEffect(() => {
        const wishList = JSON.parse(localStorage.getItem("likedItems") || '[]');
        setLiked(wishList.includes(id));
      }, [id]);
      

    const handleClick = (e) => {
        e.preventDefault();
        const wishList = JSON.parse(localStorage.getItem("likedItems") || '[]');

        let updatedList;
    
        if (liked) {
            updatedList = wishList.filter(item => item !== id); 
        } else {
            updatedList = [...wishList, id]; 
        }
    
        localStorage.setItem("likedItems", JSON.stringify(updatedList));
        setLiked(!liked);
    }
    
    return(
        <button onClick={handleClick }>
            <FontAwesomeIcon icon={faHeartSolid} color={liked ? "red" : "gray"} />
        </button>
    )
}