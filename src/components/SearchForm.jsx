export default function SearchForm() {
    return(
        <>
        <h3>Søk med nøkkelord</h3>
        <form>
            <label htmlFor="inputKeywords">
                <input type="text" id="inputKeyword" placeholder="findings..."></input>
            </label>
            <button type="submit">Søk</button>
        </form> 
        </>
    )
}