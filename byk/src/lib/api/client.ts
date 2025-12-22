

// src/lib/api/client.ts
import createClient from "openapi-fetch";
import { paths } from "@/lib/schemas/gateway-api-schema"; // This is the generated file

export const api = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL
});

