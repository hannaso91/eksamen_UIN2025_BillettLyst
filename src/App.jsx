import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './components/Home'
import EventPage from './components/EventPage'
import CategoryPage from './components/CategoryPage'
import Dashboard from './components/Dashboard'
import { useEffect, useState } from 'react'
import Welcome from './components/Welcome'


function App() {

  const [festivals, setFestivals] = useState([]);
  const filterFestival = "K8vZ917oWOV,K8vZ917bJC7,K8vZ917_YJf,K8vZ917K7fV"; 

  const [signedIn, setSignedIn] = useState(false) //For at brukeren ikke skal være logget inn fra start
  const [storageLiked, setStorageLiked] = useState(() => {
    return JSON.parse(localStorage.getItem("likedItems") || "[]");
  });
  
  const [storageUser, setStorageUser] = useState(localStorage.getItem("user"))

  useEffect(() => {
    const login = sessionStorage.getItem("login") === "true"
    setSignedIn(login)
    console.log("sessionStorage", login)
}, [])

//Hele biten under fjerner vi når sanity fungerer som det skal
useEffect(() => {
  if (!localStorage.getItem("user")) {
    const testUser = { username: "Signesoj"};
    localStorage.setItem("user", JSON.stringify(testUser));
    setStorageUser(JSON.stringify(testUser));
    console.log("Testbruker lagt til i localStorage");
  }
}, []); // Ettersom vi skal hente inn fra sanity, lagde vi en testuser for å se om logg inn og logg ut fungerte

 
  
  
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
      <Layout signedIn={signedIn} setSignedIn={setSignedIn}>
        <Routes>
          <Route path="/" element={<Home festivals={festivals}/>} />
          <Route path="/event/:id" element={<EventPage festivals={festivals}/>} />
          <Route path="/category/:slug" element={<CategoryPage storageLiked={storageLiked}/>} />
          <Route path="/dashboard" element={signedIn ? <Welcome setSignedIn={setSignedIn}/> : <Dashboard storageUser={storageUser} setSignedIn={setSignedIn} signedIn={signedIn}/>} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
