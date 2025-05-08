import {client} from "./client"

export async function fetchArrangement (){
    const data = await client.fetch(`*[_type == 'event'] {_id, title, apiid}`)
    return data
}

export async function fetchByAPIinSanity (apiid) {
    const data = await client.fetch(`*[_type == "event" && apiid == $apiid][0]{
          _id,
          title,
          apiid
        }`, {apiid})
    return data
}