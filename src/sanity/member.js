import {client} from "./client"

export async function fetchMember (){
    const data = await client.fetch(`*[_type == 'user'] {_id, name, age, gender, image{asset ->{_id, url}}}`)


    return data
}