import { createClient } from "@sanity/client";

export const client = createClient({
    projectId: "schk435k",
    dataset: "production",
    apiVersion: "v2025-03-24",
    useCdn: false,
})