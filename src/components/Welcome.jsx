export default function Welcome({me, friend}) {

    console.log(me)

    return(
        <>
        <h1>Dashboard</h1>
        <h2>Velkommen {me?.name}</h2>
        <img src={me?.image?.asset?.url} alt={me?.name}/>
        <p>{me?.age}</p>
        <p>{me?.gender}</p>
        
        <h2>Venner</h2>
        <img src={friend?.image?.asset?.url} alt={friend?.name}/>
        <p>{friend?.name}</p>
        <p>Du og {friend?.name} ønsker begge å dra på findings fesival. Hva med å dra sammen? </p>



        <h2>Mine kjøp</h2>
        <h2>Ønskeliste</h2>
        </>
    )
} 