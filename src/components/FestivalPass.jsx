

export default function FestivalPass ({festivalpass}){

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