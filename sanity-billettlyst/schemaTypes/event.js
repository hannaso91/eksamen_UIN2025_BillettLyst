export const events = {
    name: "event",
    title: "Arrangement",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Tittel på arrangementet",
            type: "string"
        },
        {
            name: "apiid",
            title: "API Id fra ticketmaster",
            type: "string"
            //Legge inn at det refererer til APIid, aner ikke hvordan må undersøkes
        }
    ]
}