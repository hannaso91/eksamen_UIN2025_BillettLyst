import {client} from "./client"

// i de nedenfor henter vi inn kun den dataen vi har behov for, dette for å slippe og ha for mye data tilgjengelig som gjør siden tregere ved lasting

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