import "../styles/categoryPage.scss"
export default function SearchForm({setKeyword}) {

    // Dette er funksjonen for å sende inn søkeordet.
    const handleSubmit = (e) => {
        e.preventDefault()
        const keyword = e.target.elements.inputKeyword.value.trim().toLowerCase() //Her hentes verdien fra inputfeltet (altså det bruker har skrevet inn som keyword). Trimmer også mellomrom her sånn tilfelle det blir ekstra mellomrom
        // gjør det også til små bokstaver, slik at det fungerer godt med apiet uansett hvordan det skrives i søkefeltet (store eller små bokstaver
        console.log("Brukeren søkte på:", keyword) //måtte logge søkeordet for å se at det fungerte, så vi hele tiden har kontroll på hvor det eventuelt stopper om det stopper et sted
        setKeyword(keyword) //her lagrer vi det som ligger i variabelen keyword i usestaten fra categorypage
    }

    return(
        <>
        <h3 className="searchHeading">Søk med nøkkelord</h3>
        <form className="searchFormstyling" onSubmit={handleSubmit}>
            <label htmlFor="inputKeyword">
                <input type="text" id="inputKeyword" placeholder="findings..."></input>
            </label>
            <button className="filtersearchbtn" type="submit">Søk</button>
        </form> 
        </>
    )
}