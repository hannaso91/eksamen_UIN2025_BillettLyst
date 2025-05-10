import "../styles/eventCard.scss"

//Dette komponentet blir holdt enkelt ettersom det skal gjenbrukes andre steder, stedene dette gjenbruker sender pass som prop hver gang.
export default function EventCard ({pass}){
    return(
        <div className="articleClassPass"> {/*Div er kun for css bruk*/}
          <article>
              <img src={pass.images?.[0].url}/>
              <h3>{pass.name}</h3>
              <p>{pass._embedded?.venues?.[0]?.name}</p>
              <p>{pass._embedded?.venues?.[0]?.city.name}</p>
              <p>{pass._embedded?.venues?.[0]?.country.name}</p>
              <p>{pass.dates?.start?.localDate}</p>
          </article>
        </div>
    )
}