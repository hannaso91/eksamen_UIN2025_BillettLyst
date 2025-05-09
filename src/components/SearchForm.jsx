export default function SearchForm({setKeyword}) {

    const handleSubmit = (e) => {
        e.preventDefault()
        const keyword = e.target.elements.inputKeyword.value.trim().toLowerCase()
        console.log("Brukeren søkte på:", keyword)
        setKeyword(keyword)
    }

    return(
        <>
        <h3>Søk med nøkkelord</h3>
        <form onSubmit={handleSubmit}>
            <label htmlFor="inputKeyword">
                <input type="text" id="inputKeyword" placeholder="findings..."></input>
            </label>
            <button type="submit">Søk</button>
        </form> 
        </>
    )
}