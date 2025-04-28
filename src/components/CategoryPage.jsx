import { useParams } from "react-router-dom"

export default function CategoryPage () {

    const {slug} = useParams()

    return(
        <h2>{slug}</h2>
    )
}