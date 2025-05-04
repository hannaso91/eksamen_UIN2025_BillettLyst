import { useState } from "react"
import { useParams } from "react-router-dom"

export default function CategoryPage () {

    const {slug} = useParams()
    const [date, setDate] = useState("")
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")

    return(
        <section className="filterSearch">
            <h2>{slug}</h2>
            <h3>Filtrert søk</h3>
            <form>
                <label htmlFor="date">
                    <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)}></input>
                </label>
                <label htmlFor="country">
                    <select id="country" name="country" value={country} onChange={(e) => setCountry(e.target.value)}>
                        <option value="Norge">Norge</option>
                        <option value="Sverige">Sverige</option>
                        <option value="Danmark">Danmark</option>
                    </select>
                </label>
                <label htmlFor="city">
                    <select id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)}>
                        <option value="oslo">Oslo</option>
                        <option value="stockholm">Stockholm</option>
                        <option value="København">København</option>
                    </select>
                </label>
            </form>

        </section>
    )
}