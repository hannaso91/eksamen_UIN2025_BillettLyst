import { useState } from "react";

export default function CityEvents() {
  const [selectedCity, setSelectedCity] = useState("");
  const [cityevents, setCityEvents] = useState([]);

  const handleClick = (city) => {
    setSelectedCity(city);

    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&size=10&apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD`)
      .then(response => response.json())
      .then(data => {
        setCityEvents(data._embedded?.events || []);
      })
      .catch(error => {
        console.error("Steike da! Det skjedde noe galt, er du sjokkert? NEI! Ikke jeg heller", error);
      });
  };

  return (
    <div className="cityEvents">
      {["Oslo", "Stockholm", "Berlin", "Paris", "London"].map((city) => (
        <button key={city} onClick={() => handleClick(city)}>
          {city}
        </button>
      ))}

      <h3>Arrangementer i {selectedCity}</h3>
      <ul>
        {cityevents.map((event) => (
          <li key={event.id}>
            <img src={event.images?.[0]?.url}/>
            <p>{event.name}</p>
            <p>{event.dates.start.localDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
