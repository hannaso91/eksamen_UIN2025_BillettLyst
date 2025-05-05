export default function Welcome({setSignedIn}) {

    const handleLogout = () => {
        sessionStorage.setItem("login", false)
        setSignedIn(false);
    }

    return(
        <>
        <h1>Min side</h1>
        <button onClick={handleLogout}>Logg ut</button>
        </>
    )
} 