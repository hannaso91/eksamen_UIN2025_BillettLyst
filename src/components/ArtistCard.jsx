export default function ArtistCard({ festivalpass }) {
    return (
      <section>
        {festivalpass.map((event) => (
          <article key={event.id}>
            <h3>{event.name}</h3>
  
            {event._embedded?.attractions?.length > 0 ? (
              <ul>
                {event._embedded.attractions.map((artist) => (
                  <li key={artist.id}>{artist.name}</li>
                ))}
              </ul>
            ) : (
              <p>Ingen artister funnet</p>
            )}
          </article>
        ))}
      </section>
    );
  }