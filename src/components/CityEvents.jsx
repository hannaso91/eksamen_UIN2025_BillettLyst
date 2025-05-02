import { useState } from "react"

export default function CityEvents() {

    const [selectedCity, setSelectedCity] = useState()
    const handleClick = async(city) => {
        setSelectedCity(city)
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=${City}size=10&apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD`)
        .then(response => response.json())
        .then((data) => console.log("city",data))
        .catch(error => console.error("neinei, det går ikke", error))
    }

    return(
        <h2></h2>
    )
}