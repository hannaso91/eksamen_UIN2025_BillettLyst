import "../styles/loginInput.scss"

export default function LoginInput() {
    return (
        <>
        
        <form>
            <label>
                Brukernavn
                <input type="text" placeholder="Signesoj...." name="username" />
            </label>
            <button>Logg inn</button>
        </form>
        
        </>
    )
}