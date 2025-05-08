export default function Welcome({me, friend}) {

    console.log(me)

    return(
        <>
        <h1>Dashboard</h1>
        <h2>Velkommen {me.name}</h2>
        <img src={me?.image?.asset?.url} alt={me.name}/>
        <p>{me.age}</p>
        <p>{me.gender}</p>
        
        </>
    )
} 