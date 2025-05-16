import "../styles/categoryPage.scss"

export default function SearchForm({ setKeyword }) {

    const handleSubmit = (e) => {
        e.preventDefault();
        const keyword = e.target.elements.inputKeyword.value.trim().toLowerCase();
        console.log("Brukeren søkte på:", keyword);
        setKeyword(keyword); // Sender søkeordet til CategoryPage der usestaten er opprettet, sendt inn den funksjonen som prop for å kunne endre på innholdet i staten
    }

    return (
        <>
            <h3 className="searchHeading">Søk med nøkkelord</h3>
            <form className="searchFormstyling" onSubmit={handleSubmit}> 
                <label htmlFor="inputKeyword">
                    <input type="text" id="inputKeyword" placeholder="Findings..." />
                </label>
                <button type="submit">Søk</button>
            </form>
        </>
    )
}
