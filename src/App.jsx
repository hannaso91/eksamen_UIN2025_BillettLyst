import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './components/Home';
import EventPage from './components/EventPage';
import CategoryPage from './components/CategoryPage';
import Dashboard from './components/Dashboard';
import SanityEventDetails from './components/SanityEventDetails';
import { useEffect, useState } from 'react';
import Welcome from './components/Welcome';
import { fetchMember } from './sanity/member';
import { fetchArrangement } from './sanity/arrangement';

function App() {
  const [festivals, setFestivals] = useState([]);
  const [user, setUser] = useState([]);
  const [signedIn, setSignedIn] = useState(false);
  const [me, setMe] = useState(null);
  const [friend, setFriend] = useState(null);
  const [storageLiked, setStorageLiked] = useState(localStorage.getItem("liked"));

  const filterFestival = "K8vZ917oWOV,K8vZ917bJC7,K8vZ917_YJf,K8vZ917K7fV";

  // Hent brukere fra Sanity uansett om logget inn eller ikke
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await fetchMember();
      setUser(data);
    };
    fetchUsers();
  }, []);

  // Sjekk om bruker allerede er logget inn (fra sessionStorage)
  useEffect(() => {
    const login = localStorage.getItem("login") === "true";
    setSignedIn(login);
  }, []);

  // Hent festivals fra Ticketmaster
  const getEventsById = async () => {
    fetch(`https://app.ticketmaster.com/discovery/v2/attractions.json?id=${filterFestival}&countryCode=NO&apikey=AFEfcxa4XlCTGJA56Jk356h0NkfziiWD`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data._embedded && data._embedded.attractions) {
          setFestivals(data._embedded.attractions);
        } else {
          console.log("Ingen treff på IDene");
        }
      })
      .catch(error => console.error("Feil ved henting:", error));
  };

  useEffect(() => {
    getEventsById()
  }, [])


  // Når bruker er logget inn og vi har fått brukerlisten, kjører sett me og friend. Denne biten er hentet fra chatgpt, se dokumentasjon. Det med å få logg inn til å fungere er det eneste vi har brukt chatgpt til
  useEffect(() => {
    if (signedIn && user.length > 0) {
      const loggedInName = localStorage.getItem("loggedInName")?.toLowerCase();
      const meUser = user.find(u => u.name.toLowerCase() === loggedInName);
      const friendUser = user.find(u => u._id !== meUser?._id);
      setMe(meUser);
      setFriend(friendUser);
    }
  }, [signedIn, user]);

  return (
    <>
      <Layout signedIn={signedIn} setSignedIn={setSignedIn}>
        <Routes>
          <Route path="/" element={<Home festivals={festivals} />} />
          <Route path="/event/:id" element={<EventPage festivals={festivals} />} />
          <Route path="/category/:slug" element={<CategoryPage storageLiked={storageLiked} />} />
          <Route path="/dashboard" element={
            signedIn
              ? <Welcome setSignedIn={setSignedIn} me={me} friend={friend}/>
              : <Dashboard setSignedIn={setSignedIn} user={user} />
          } />
          <Route path="/sanity-event/:apiId" element={<SanityEventDetails />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
