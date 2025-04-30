import { useEffect, useState } from "react"

export default function FestivalPass ({id}){

    
    const [festivalpass, setFestivalPass] = useState([])
    

    const getFestivalPass = async () => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?attractionId=${id}&locale=NO&apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD`)
        .then(response => response.json())
        .then((data) => setFestivalPass(data._embedded.events))
        .catch((error) => console.error("Steike da! Det skjedde noe galt, er du sjokkert? NEI! Ikke jeg heller", error))
    }

    console.log(festivalpass)

    useEffect(() => {
        getFestivalPass()
    }, [id])



    return(
        <>
        {festivalpass.map(pass => 
            <article key={pass.id}>
                <img src={pass.images?.[0].url}/>
                <h3>{pass.name}</h3>
                <p>{pass._embedded?.venues?.[0]?.name}</p>
                <p>{pass.dates?.start?.localDate}</p>
                <button>Kjøp</button>
                <button>Legg til i ønskeliste</button>
            </article>
            
        )}
       </>
    )
}