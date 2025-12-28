// src/lib/api/client.ts
import createClient, { Middleware } from "openapi-fetch";
import { redirect } from "next/navigation";
import { paths } from "@/lib/schemas/gateway-api-schema"; // This is the generated file
import { NotAuthenticated } from "@/lib/api/exceptions";
import { cookies } from "next/dist/server/request/cookies";
import { generateRequestId } from "@/lib/utils/requestId";

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value || null;
  if (token) {
    return token;
  } else {
    throw new NotAuthenticated("No authentication token found");
  }
}

export async function setAuthToken(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("access_token", token, { httpOnly: true, path: '/' });
}

const authenticationMiddleware: Middleware = {
  async onRequest({ request, options }) {
    // Add authentication headers or tokens here
    console.log(request.url);
    if (request.url.includes("/accounts/login")) {
      return request; // Skip adding token for login requests
    }

    const token = await getAuthToken(); // Assume this function retrieves a valid auth token
    if (token) {
      request.headers.set("Authorization", `Bearer ${token}`);
    } else {
      redirect("/accounts/login");
    }
    return request;
  },

  async onResponse({ response, request, options }) {
    if (request.url.includes("/accounts/login")) {
      return response; // Skip handling for login responses
    }

    if (response.status === 401) {
      const r = response.clone();
      const data = await r.json();
      const message = data?.message || "User is not authenticated";

      // Handle unauthorized access globally
      console.log("Unauthorized access - perhaps redirect to login?");
      // e.g., redirect to login page or refresh token logic

      throw new NotAuthenticated(message);
    }

    // Handle response globally if needed
    return response;
  },
};

const requestIdMiddleware: Middleware = {
  async onRequest({ request, options }) {
    // Add a unique request ID to each request for tracing
    const requestId = generateRequestId();
    request.headers.set("X-Request-ID", requestId);
    return request;
  }
}

export const getClient = (token?: string) => {
  const client = createClient<paths>({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  });

  client.use(requestIdMiddleware);
  client.use(authenticationMiddleware);
  return client;
};
