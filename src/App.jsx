import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './components/Home'
import EventPage from './components/EventPage'
import CategoryPage from './components/CategoryPage'
import Dashboard from './components/Dashboard'
import { useEffect, useState } from 'react'

function App() {

  const [eventsByNeon, setEventsByNeon] = useState([])
    const [eventsByFindings, setEventsByFindings] = useState([])
    const [eventsByTonsOfRock, setEventsByTonsOfRock] = useState([])

    const filterByNeon = "Neon"
    const filterByFindings = "Findings"
    const filterByTonsOfRock = "Tons of Rock"

    const getEventsByNeon = async() => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${filterByNeon}&apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD&size=100`) //Etter en del prøving og feiling her tenkte vi å prøve og gjøre keywords dynamisk
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data._embedded && data._embedded.events) { //Sjekker om det som hentes ut har data lagret i disse nøklene. Om de ikke har det skal de ikke printes ut da de ikke eksisterer
                setEventsByNeon(data._embedded.events)
            } else {
                console.log(`Ingen treff på søkeordet: ${filterByNeon}`) //Legger inn denne loggen for å vite om fethen har innhold, har den ikke får vi beskjed
            }    
      })
      .catch(error => console.error("Feil ved henting av arrangementer:", error));
    }

    const getEventsByFindings = async() => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${filterByFindings}&apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD`) //Etter en del prøving og feiling her tenkte vi å prøve og gjøre keywords dynamisk
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data._embedded && data._embedded.events) { 
                setEventsByFindings(data._embedded.events)
            } else {
                console.log(`Ingen treff på søkeordet: ${filterByFindings}`) 
            }    
      })
      .catch(error => console.error("Feil ved henting av arrangementer:", error));
    }

    const getEventsByTonsOfRock = async() => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${filterByTonsOfRock}&apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD`) //Etter en del prøving og feiling her tenkte vi å prøve og gjøre keywords dynamisk
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data._embedded && data._embedded.events) { 
                setEventsByTonsOfRock(data._embedded.events)
            } else {
                console.log(`Ingen treff på søkeordet: ${filterByTonsOfRock}`) 
            }    
      })
      .catch(error => console.error("Feil ved henting av arrangementer:", error));
    }

    useEffect(() => {
        getEventsByNeon()
        getEventsByFindings()
        getEventsByTonsOfRock()
    }, []) 
 

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home eventsByNeon={eventsByNeon} filterByNeon={filterByNeon} setEventsByNeon={setEventsByNeon} eventsByFindings={eventsByFindings}/>} />
          <Route path="/event/:id" element={<EventPage eventsByNeon={eventsByNeon}/>} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
