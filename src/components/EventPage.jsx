import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function EventPage({eventsByNeon}) {

    const {id} = useParams()
    const [result, setResult] = useState()

    const selectedEvent = eventsByNeon.find(event => event.id === id)

    if (!selectedEvent) {
        return <p>Laster event...</p>
    }

    console.log("id som kommer fra URL", id)

    return (
        <h2>{id}</h2>
    )
}