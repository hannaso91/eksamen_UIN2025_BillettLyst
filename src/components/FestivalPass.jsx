import { useState } from "react"
import { useParams } from "react-router-dom"

export default function FestivalPass ({id}){

    
    const [festivalpass, setFestivalPass] = useState([])
    

    const getFestivalPass = async () => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events/attractionId=${id}.json?apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD`)
        .then(response => response.json())
        .then((data) => 
            console.log(data))
        .catch((error) => console.error("Steike da! Det skjedde noe galt, er du sjokkert? NEI! Ikke jeg heller", error))
    }



    return(
        <h2></h2>
       
    )
}