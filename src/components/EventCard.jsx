import "../styles/eventCard.scss"

export default function EventCard ({pass}){
    return(
        <>
          <article key={pass.id}>
              <img src={pass.images?.[0].url}/>
              <h3>{pass.name}</h3>
              <p>{pass._embedded?.venues?.[0]?.name}</p>
              <p>{pass._embedded?.venues?.[0]?.city.name}</p>
              <p>{pass._embedded?.venues?.[0]?.country.name}</p>
              <p>{pass.dates?.start?.localDate}</p>
              <a href={pass.url} target="blank"><button>Kjøp</button></a>
              <button>Legg til i ønskeliste</button>
          </article>
        </>
    )
}