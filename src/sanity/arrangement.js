import {client} from "./client"

export async function fetchArrangement (){
    const data = await client.fetch(`*[_type == 'event'] {_id, title, apiid}`)
    return data
}