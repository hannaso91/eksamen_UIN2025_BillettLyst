import { createClient } from "@sanity/client";

export const client = createClient({
    projectId: "p7tw8lfq",
    dataset: "production",
    apiVersion: "v2025-03-24",
    useCdn: false,
})