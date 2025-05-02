export default function ArtistCard({ festivalpass }) {
    const attractions = festivalpass[2]?._embedded?.attractions;

    if (!attractions) return <p>Ingen artister funnet i festivalpass</p>;

    return (
        <>
            {attractions.map(artist => (
                <div key={artist.id}>
                    <h3>{artist?.name}</h3>
                </div>
            ))}
        </>
    );
}