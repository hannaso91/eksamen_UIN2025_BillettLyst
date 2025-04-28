export default function LoginInput() {
    return (
        <>
        <section>
            <form>
                <label>
                    Brukernavn
                    <input type="text" placeholder="Hannaso" name="username" />
                </label>
                <button>Logg inn</button>
            </form>
        </section>
        </>
    )
}