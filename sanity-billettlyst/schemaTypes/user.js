import { events } from "./event";

export const user = {
    name: 'user',
    title: 'Bruker',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Navn',
            type: 'string'
        },
        {
            name: 'gender',
            title: 'Kjønn',
            type: 'string'
        },
        {
            name: 'age',
            title: 'Alder',
            type: 'number'
        },
        {
            name: 'previousPurchases',
            title: 'Tidligere kjøp',
            type: 'reference',
            to: [{type: 'events'}]
        },
        {
            name: 'wishlist',
            title: 'Ønskeliste',
            type: 'reference',
            to: [{type: 'events'}]
        }
    ]
    
}