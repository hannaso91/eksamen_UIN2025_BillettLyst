import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchByAPIinSanity } from "../sanity/arrangement"

export default function SanityEventDetails() {

    const {apiId} = useParams()
    const [eventSanity, setEventSanity] = useState()
    const [ticketmasterData, setTicketmasterData] = useState()

    console.log("api id fra url", apiId)

    //Lager en ny fetch i arrangement.js fra sanity basert på id fra apiet som følger url
    const fetchFromAPI = async(apiId) => {
        const data = await fetchByAPIinSanity(apiId)
        setEventSanity(data)
    }

    const getDataFromTicketmaster = async () => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events/${eventSanity.apiId}.json?&apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD`)
          .then(response => response.json())
          .then(data => {
            console.log("fetch fra ticketmaster på id",data);
            setTicketmasterData(data)
          })
          .catch(error => console.error("Feil ved henting:", error));
      };

    useEffect(() => {
        fetchFromAPI(apiId)
    }, [apiId]) //Endrer url seg skal fetchen kjøres på nytt

    useEffect(() => {
        getDataFromTicketmaster()
    }, [eventSanity]) //setter inn en betingelse her om at hvis det som ligger lagret i staten eventSanity endrer seg skal useEffect kjøre på nytt

    console.log("fetch fra sanity basert på ID", eventSanity)

  

   


    return (
        <h2>{eventSanity?.name}</h2>
    )
    
}