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
            name: 'image',
            title: 'Bilde av person',
            type: 'image'
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
            type: 'array',
            of: [{type: 'reference', to: [{type: 'event'}] }]
        },
        {
            name: 'wishlist',
            title: 'Ønskeliste',
            type: 'array',
            of: [{type: 'reference', to: [{type: 'event'}] }]
        }
    ]
    
}