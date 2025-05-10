import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from 'react';

export default function HeartIcon({id}) {
    const [liked, setLiked] = useState (false) //Setter til default false så hjertet ikke er klikket og lyser rødt fra start

    //Koden for å få til dette er hentet fra forelesning om localStorage med Ann-Charlott
    // Useeffekten her sin hensikt er å sjekke om id eksisterer i localstorage, og oppdatere liked tilstanden i usestaten deretter.
    //useeffekten kjører hver gang komponentet rendres eller at id endrer seg. 
    useEffect(() => {
        const wishList = JSON.parse(localStorage.getItem("likedItems") || '[]');
        //sjekker om id finnes i ønskeliste, hvis den gjør settes liked til true og hvis ikke settes liked til false
        setLiked(wishList.includes(id));
      }, [id]);
      

    const handleClick = (e) => {
        e.preventDefault();
        //Finner det som allerede ligger i localstorage, er det ikke noe der blir det en tom array. Denne pakkes ut senere i koden slik at alt blir sendt til localstorage 
        const wishList = JSON.parse(localStorage.getItem("likedItems") || '[]');
        let updatedList;
        if (liked) {
            // Hvis arrangementet allerede er likt, fjern det fra listen, da blir fargen grå igjen
            updatedList = wishList.filter(item => item !== id); 
        } else {
            // Hvis arrangementet ikke finnes i listen fra før så legg det til
            //Vi ønsker ikke å endre hele den listen, derfor pakker vi ut wishlist først og legger til det som ligger der + den nye i updatedList
            updatedList = [...wishList, id]; 
        }
    
        //Denne kodebiten lagrer updatedList i localstorage. Stringify gjør listen til stringer, dette fordi localstorage bare kan lagre tekst/strings
        localStorage.setItem("likedItems", JSON.stringify(updatedList));
        //Den siste biten setter useState til det motsatte av det den er. Er den true blir den false og motsatt. Derfor bruker vi !.
        setLiked(!liked);
    }
    
    return(
        <button onClick={handleClick }> {/*Her bruker vi funksjonen definert over, slik at når disse ikonene trykkes så skjer det som er definert i handleclick.*/}
            <FontAwesomeIcon icon={faHeartSolid} color={liked ? "red" : "gray"} /> {/*Fant ut hvordan vi får inn ikoner i react gjennom denne siden https://docs.fontawesome.com/web/use-with/react/add-icons*/}
        </button>
    )
}