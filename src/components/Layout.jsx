import Nav from "./Nav";
import "../styles/nav.scss"
import "../styles/footer.scss"

export default function Layout({children, signedIn, setSignedIn}) { //denne brukes på app rundt hele routingen. Da blir dette med på hver eneste side gjennom hele. Den tar imot props for å logge ut og innloggingsstatus
    //children props er i react fra før, og brukes for å rendre ut alt inni main i dette tilfellet.

    //Denne håndterer logg ut når bruker er logget inn. Den setter login til false og signedin blir false, ser i ettertid at denne kanskje burde vært i Nav.jsx og ikke her
    const handleLogout = () => {
        sessionStorage.setItem("login", false)
        setSignedIn(false);
    }

    return(
        <>
        <header>
            {/*her sender vi props slik at nav vet om bruker er logget inn eller ikke, viser i Nav.jsx tiltenkt funksjon og begrunnelse for hvorfor vi sender dette som prop dit*/}
           <Nav signedIn={signedIn} handleLogout={handleLogout}/> 
        </header>
        <main>
            {children}
        </main>
        <footer>
            <p>Data levert av <a href="https://developer.ticketmaster.com/" target="_blank">Ticketmaster</a></p>
        </footer>
        </>
    )
}