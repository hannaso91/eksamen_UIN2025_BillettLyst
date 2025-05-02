import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './components/Home'
import EventPage from './components/EventPage'
import CategoryPage from './components/CategoryPage'
import Dashboard from './components/Dashboard'
import { useEffect, useState } from 'react'
import CityEvents from './components/CityEvents'

function App() {

  const [festivals, setFestivals] = useState([]);
  const filterFestival = "K8vZ917oWOV,K8vZ917bJC7,K8vZ917_YJf,K8vZ917K7fV"; 
  
  const getEventsById = async () => {
    fetch(`https://app.ticketmaster.com/discovery/v2/attractions.json?id=${filterFestival}&countryCode=NO&apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data._embedded && data._embedded.attractions) {
          setFestivals(data._embedded.attractions);
        } else {
          console.log(`Ingen treff på IDene`);
        }
      })
      .catch(error => console.error("Feil ved henting:", error));
  };
  
  useEffect(() => {
    getEventsById();
  }, []);
  
 

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home festivals={festivals}/>} />
          <Route path="/event/:id" element={<EventPage festivals={festivals}/>} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
