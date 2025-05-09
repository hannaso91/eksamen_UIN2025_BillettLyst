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
        title: "API-id fra Ticketmaster",
        type: "string",
        description: "Kopier inn event.id fra Ticketmaster, f.eks. 'Z698xZb_Z16v0f8V-g'"
      }
    ],
    preview: {
      select: {
        title: "title",
        subtitle: "apiid"
      }
    }
  };
  